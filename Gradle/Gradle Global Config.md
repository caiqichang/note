# Gradlle Global Config

- Environment Variable: GRADLE_USER_HOME

- `init.gradle` under environment variable 
1. Third Part Repository
```groovy
allprojects {
  repositories {
    maven {
      url 'Repository Address'
    }
    mavenLocal()
    mavenCentral()
  }
}
```

- `gradle.properties` under environment variable (has priority to Project)
1. Encoding
```properties
org.gradle.jvmargs=-Dfile.encoding=UTF-8
```
2. Proxy
```properties
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1080
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1080
```