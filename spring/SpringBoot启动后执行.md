# Spring Boot 启动后执行

```java
@Component
public class AfterRun {
    @EventListener(ApplicationReadyEvent.class)
    public void accept() {
        // ...
    }
}
```
