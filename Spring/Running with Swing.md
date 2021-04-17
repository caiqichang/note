# Running with Swing

- `headless` means do not instantiate `AWT`, default is true, set false to enable `Swing`.
```java
SpringApplicationBuilder builder = new SpringApplicationBuilder(APPLICATION.class);
builder.headless(false).run(args);
```
