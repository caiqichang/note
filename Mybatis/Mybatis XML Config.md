# Mybatis XML Config

## Spring Boot Config
1. Without other item of Mybatis config, 
it means that only one of `XML Config` or `Java Config` could exist. 
2. This file is relative to `src/main/resources`.
```yaml
mybatis:
  config-location: classpath:mybatis/MybatisConfig.xml
```

## MybatisConfig.xml
1. Mapper file path config in this is relative to `src/main/resources`.
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
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    
<mapper>
    
</mapper>
```