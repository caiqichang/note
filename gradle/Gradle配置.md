# Gradle 配置

- 环境变量 `GRADLE_USER_HOME`

- 全局脚本 `init.gradle`
1. 阿里云仓库
```groovy 
allprojects {
  repositories {
    maven {
      url 'https://maven.aliyun.com/repository/public/'
    }
    mavenLocal()
    mavenCentral()
  }
}
```

- 属性 `gradle.properties` 环境变量中的优先于项目中的
1. UTF-8编码
```properties
org.gradle.jvmargs=-Dfile.encoding=UTF-8
```
2. 代理
```properties
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1080
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1080
```