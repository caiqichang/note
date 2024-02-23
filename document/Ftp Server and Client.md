# Ftp Server and Client

> 1. Ftp is based on TCP/IP, default port: `21` for control and `20` for data.
> 2. URL format: `ftp://[username[:password]@]<IP or domain>[:port]<file path>`.
e.g. `ftp://admin:123@10.10.10.10:2000/path/to/file.txt`

## Server Side
Maven Dependency: 
```xml
<dependency>
    <groupId>org.apache.ftpserver</groupId>
    <artifactId>ftpserver-core</artifactId>
    <version></version>
</dependency>
```

Initialize and Startup:
```kotlin
val ftpServerFactory = FtpServerFactory()
val userManager = PropertiesUserManagerFactory().createUserManager()

// setup anonymous user (optional)
val anonymous = BaseUser()
anonymous.homeDirectory = "root/path/of/user"
// the name must be anonymous
anonymous.name = "anonymous"
userManager.save(anonymous)

// setup login user (optional)
val user = BaseUser()
user.homeDirectory = "root/path/of/user"
user.name = "username"
user.password = "password"
// add permission of writing file (optional) 
user.authorities = listOf(WritePermission())
userManager.save(user)

ftpServerFactory.userManager = userManager

// add port of control (optional, the default port 21 still available)
val listenerFactory = ListenerFactory()
listenerFactory.port = port
ftpServerFactory.addListener("listen_port", listenerFactory.createListener())

// start ftp server
ftpServer = ftpServerFactory.createServer()
ftpServer?.start()
```

Shutdown:
```kotlin
fun stop() = ftpServer?.run { if (!isStopped) stop() }

@PreDestroy
fun clear() = stop()
```

## Client Side

> Accoding to the server, URL's path or filename may need decoding, usually from `GBK` or `UTF_8` to `ISO_8859_1`.

Add authentication information to URL:
```kotlin
/**
    * Add authentication information to URL, keep the original if exist.
    * @param url address
    * @param username username
    * @param password password
    * @return URL with authentication
    */
fun wrapUrl(url: String, username: String?, password: String?): String {
    val ftpUrl = URL(url)
    return if (StringUtils.hasText(ftpUrl.userInfo))
        url
    else "ftp://${
        if (username != null) "${username}${
            if (password != null) ":${password}@" else "@"
        }" else ""
    }${ftpUrl.host}${
        if (ftpUrl.port > 0) ":${ftpUrl.port}" else ""
    }${ftpUrl.path}"
}
```

### Using Apache FtpClient
```kotlin
/**
 * Generate Apache FTP Client.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @return FTP client
 */
fun createFtpClient(url: String): FTPClient {
    val ftpUrl = URL(url)
    val client = FTPClient()

    // Setup domain or IP and port.
    client.connect(ftpUrl.host, if (ftpUrl.port > 0) ftpUrl.port else 21)

    // Setup authentication infomation, maybe the FTP server is allowed login as anonymous.
    if (StringUtils.hasText(ftpUrl.userInfo)) {
        val arr = ftpUrl.userInfo.split(":")
        client.login(arr[0], if (arr.size > 1) arr[1] else null)
    } else {
        client.login("anonymous", null)
    }

    return client
}

/**
 * Close Apache FTP Client.
 * @param client Apache FTP client
 */
fun close(client: FTPClient) {
    client.logout()
    client.disconnect()
}

/**
 * Download file via Apache FTP client.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @return byte array of file
 */
fun downloadFileViaApache(url: String): ByteArray {
    val path = URL(url).path
    val index = path.lastIndexOf("/")

    val client = createFtpClient(url)
    client.changeWorkingDirectory("${path.substring(0, index)}/")
    var buffer = byteArrayOf()
    ByteArrayOutputStream().use {
        client.retrieveFile(path.substring(index + 1, path.length), it)
        buffer = it.toByteArray()
    }
    close(client)

    return buffer
}

/**
 * Upload file via Apache FTP client.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @param buffer byte array of file
 */
fun uploadFileViaApache(url: String, buffer: ByteArray) {
    val path = String(URL(url).path.toByteArray(Charsets.UTF_8), Charsets.ISO_8859_1)
    val index = path.lastIndexOf("/")

    val client = createFtpClient(url)
    val directory = "${path.substring(0, index)}/"
    client.makeDirectory(directory)
    client.changeWorkingDirectory(directory)
    ByteArrayInputStream(buffer).use {
        client.storeFile(path.substring(index + 1, path.length), it)
    }
    close(client)
}
```

### Using Spring FtpRemoteFileTemplate
Maven Dependency:
```xml
<dependency>
    <groupId>org.springframework.integration</groupId>
    <artifactId>spring-integration-ftp</artifactId>
</dependency>
```

Attention:
- Filename or path return by `FtpRemoteFileTemplate.list(path)` maybe need decoding.

Code: 
```kotlin
/**
 * Generate FTP template.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @return FTP Template
 */
fun createFtpRemoteFileTemplate(url: String): FtpRemoteFileTemplate {
    val ftpUrl = URL(url)
    val factory = DefaultFtpSessionFactory()

    // setup host
    factory.setHost(ftpUrl.host)
    // setup port
    if (ftpUrl.port > 0) factory.setPort(ftpUrl.port)

    // Setup authentication infomation, maybe the FTP server is allowed login as anonymous.
    if (StringUtils.hasText(ftpUrl.userInfo)) {
        val arr = ftpUrl.userInfo.split(":")
        factory.setUsername(arr[0])
        if (arr.size > 1) factory.setPassword(arr[1])
    }

    // ACTIVE_LOCAL_DATA_CONNECTION_MODE
    // PASSIVE_LOCAL_DATA_CONNECTION_MODE
    // Mode of local client, it is according to FTP server.
    factory.setClientMode(FTPClient.PASSIVE_LOCAL_DATA_CONNECTION_MODE)

    return FtpRemoteFileTemplate(factory)
}


/**
 * Download FTP file.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @return byte array of file
 */
fun downloadFile(url: String): ByteArray {
    var buffer = byteArrayOf()
    createFtpRemoteFileTemplate(url).get(URL(url).path) {
        it?.run {
            ByteArrayOutputStream().use { out ->
                FileCopyUtils.copy(it, out)
                buffer = out.toByteArray()
            }
        }
    }
    return buffer
}

/**
 * Upload FTP file.
 * @param url target URL, FTP format, e.g. ftp://a:b@c:d/e/f.g
 * @param buffer byte array of file
 */
fun uploadFile(url: String, buffer: ByteArray) {
    val template = createFtpRemoteFileTemplate(url)
    val path = URL(url).path
    val index = path.lastIndexOf("/")
    
    // create directory if not exist
    template.setAutoCreateDirectory(true)
    
    // way to resolve directory
    template.setRemoteDirectoryExpression(FunctionExpression<Message<ByteArrayResource>> { it.payload.description })
    // Optional. But without following code, it will get an exception which does no influence: Creating EvaluationContext with no beanFactory.
    if (template.directoryExpressionProcessor is ExpressionEvaluatingMessageProcessor)
        (template.directoryExpressionProcessor as ExpressionEvaluatingMessageProcessor).setBeanFactory(DefaultListableBeanFactory())

    // way to resolve filename
    template.setFileNameGenerator {
        if (it.payload is Resource)
            (it.payload as Resource).filename
        else
            throw RuntimeException("payload is not [Resource] type")
    }

    template.send(GenericMessage(object : ByteArrayResource(buffer) {
        // correspond to directory resolver
        override fun getDescription() = "${path.substring(0, index)}/"

        // correspond to filename resolver
        override fun getFilename() = path.substring(index + 1, path.length)
    }))
}
```
