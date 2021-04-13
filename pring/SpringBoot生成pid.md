# SpringBoot生成pid文件

## 1. 启动类增加PidWriter监听器
```java
SpringApplicationBuilder builder = new SpringApplicationBuilder(APPLICATION.class);
builder.application().addListeners(new ApplicationPidFileWriter());
builder.run(args);
```

## 2. 配置pid文件位置
```yaml
spring:
  pid:
    file: ./log/application.pid
```
