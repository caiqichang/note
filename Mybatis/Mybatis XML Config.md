# Mybatis XML Config

## Spring Boot Config
- Base on `Java` .
```yaml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```

- Base on `XML` .
1. Without other item of Mybatis config, 
it means that only one of `XML Config` or `Java Config` could exist. 
2. This file is relative to `src/main/resources`.
```yaml
mybatis:
  config-location: classpath:mybatis/config/MybatisConfig.xml
```

## MybatisConfig.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

## Mapper File
- `namespace` is the full class name of repository interface.
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    
<mapper namespace="">
    
</mapper>
```
- To make mapper file and repository file togather, ensure to config in `pom.xml`, like:
```xml
<project>
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/mybatis/*Mapper.xml</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```