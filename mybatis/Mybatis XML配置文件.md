# Mybatis XML 配置文件

## Spring Boot 配置
```yaml
# 指定配置文件位置(以resource为根目录)
# 注意：不能有其他Mybatis配置，代码配置和XML配置只能有一种
mybatis:
  config-location: classpath:mybatis/MybatisConfig.xml
```

## Config XML 配置
> 注意：配置的mapper文件也是以resource为根目录
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```

## Mapper MXL 配置
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
    
<mapper>
    
</mapper>
```