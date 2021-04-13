# Spring Boot 运行Swing

headless 为是否不实例化 AWT，默认为true，即不实例化

```java
SpringApplicationBuilder builder = new SpringApplicationBuilder(APPLICATION.class);
builder.headless(false).run(args);
```
