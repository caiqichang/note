# Spring Boot 获取打包时间

@deprecated 改用自定义maven插件处理

通常可以用打包时间作为版本号

1. 通过Spring Boot Maven Plugin的build-info获取打包时间 <br/>
默认输出路径为 ${project.build.outputDirectory}/META-INF/build-info.properties <br/>
改为src/main/resources/路径下方便读取
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <executions>
        <execution>
            <goals>
                <goal>build-info</goal>
            </goals>
            <configuration>
                <outputFile>src/main/resources/build-info.properties</outputFile>
            </configuration>
        </execution>
    </executions>
</plugin>
```

2. build-info.properties样例 <br/>
build.time为打包时间，时区为UTC，格式如下
```properties
build.artifact=demo
build.group=com.example
build.name=demo
build.time=2020-11-23T08\:36\:07.289Z
build.version=0.0.1-SNAPSHOT
```

3. 在项目启动时预处理配置
```java
try {
    // 读取配置文件
    Properties properties = PropertiesLoaderUtils.loadProperties(new ClassPathResource("build-info.properties"));
    for (Object key : properties.keySet()) {
        // 读取打包时间
        if ("build.time".equals(key)) {
            // 转换时区和格式
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            format.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date date = format.parse(properties.getProperty(key.toString()));
            format.applyPattern("yyyy-MM-dd HH:mm");
            format.setTimeZone(TimeZone.getTimeZone("GMT+8"));
            // 添加到配置
            environment.getPropertySources().addFirst(new MapPropertySource(
                "build_time" + Math.random(), 
                Collections.singletonMap(key.toString(), format.format(date))));
            break;
        }
    }
} catch (IOException | ParseException e) {
    e.printStackTrace();
}
```
在代码中使用
```java
@Value("${build.time}")
private String build_time;
```