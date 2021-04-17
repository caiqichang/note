# After Spring Boot Start

```java
@Component
public class AfterRun {
    @EventListener(ApplicationReadyEvent.class)
    public void accept() {
        // ...
    }
}
```
