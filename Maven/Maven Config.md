# Maven Config

## Environment Variable
- M2_HOME
- MAVEN_USER_HOME (maven wrapper)

## Config File
- %username%/.m2/settings.xml (default, global)
- %M2_HOME%/conf/settings.xml

## Configuration
1. repository location in `<settings>`
```xml
<localRepository>D:\maven\repository</localRepository>
```

2. proxy in `<proxies>`
```xml
<proxy>
    <id>shadowsocks</id>
    <active>true</active>
    <protocol>http</protocol>
    <host>127.0.0.1</host>
    <port>1080</port>
</proxy>
```

3. third part repository in `<mirrors>`
```xml
<mirror>
    <id></id>
    <mirrorOf></mirrorOf>
    <name></name>
    <url></url>
</mirror>
```
- in project `pom.xml`
```xml
<repositories>
    <repository>
        <id>aliyunmaven</id>
        <name>阿里云公共仓库</name>
        <url>https://maven.aliyun.com/repository/public</url>
    </repository>
</repositories>
```
