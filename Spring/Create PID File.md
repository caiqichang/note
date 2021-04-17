# Create PID File

1. Using `PidWriter` to Spring Application.
```java
SpringApplicationBuilder builder = new SpringApplicationBuilder(APPLICATION.class);
builder.application().addListeners(new ApplicationPidFileWriter());
builder.run(args);
```

2. Config location of pid file.
```yaml
spring:
  pid:
    file: ./log/application.pid
```
