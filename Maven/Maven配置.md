# Maven配置

- 默认repository地址：https://repo1.maven.org/maven2

- 全局配置文件 `%username%/.m2/settings.xml`

- 配置文件 `%M2_HOME%/conf/settings.xml`

1. 本地仓库位置 `<settings>`
```xml
<localRepository>D:\maven\repository</localRepository>
```

2. 代理 `<proxies>`
```xml
<proxy>
    <id>proxy-http</id>
    <active>true</active>
    <protocol>http</protocol>
    <host>127.0.0.1</host>
    <port>1080</port>
</proxy>
<proxy>
    <id>proxy-https</id>
    <active>true</active>
    <protocol>https</protocol>
    <host>127.0.0.1</host>
    <port>1080</port>
</proxy>
```

3. 阿里云仓库 `<mirrors>`
```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

4. 项目pom.xml配置阿里云镜像
```xml
<repositories>
    <repository>
        <id>aliyunmaven</id>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </repository>
</repositories>
```
