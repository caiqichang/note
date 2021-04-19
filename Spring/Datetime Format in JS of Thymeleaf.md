# Datetime Format in JS of Thymeleaf

- Use timezone and format from properties file.
- Also available for CSS Serializer.

1. Custom JavaScript Serializer
- Reference to default `org.thymeleaf.standard.serializer.StandardJavaScriptSerializer`.
```java
public final class CustomJavaScriptSerializer implements IStandardJavaScriptSerializer {
    // Define properties.
    private static String timeZone;
    private static String dateFormat;

    // ...

    public ExJavaScriptSerializer(final boolean useJacksonIfAvailable, String timeZone, String dateFormat) {
        super();
        // Change constructor to initialize properties.
        CustomJavaScriptSerializer.timeZone = timeZone;
        CustomJavaScriptSerializer.dateFormat = dateFormat;

        // ...
    }

    // ...

    private static final class JacksonStandardJavaScriptSerializer implements IStandardJavaScriptSerializer {
        private final ObjectMapper mapper;
        JacksonStandardJavaScriptSerializer(final String jacksonPrefix) {
            // ..

            // Change timezone and format of Jackson mapper at the end.
            this.mapper.setTimeZone(StringUtils.isEmpty(timeZone) ? TimeZone.getDefault() : TimeZone.getTimeZone(timeZone));
            this.mapper.setDateFormat(StringUtils.isEmpty(dateFormat) ? new JacksonThymeleafISO8601DateFormat() : new SimpleDateFormat(dateFormat));
        }

        // ...
    }

    //...
}
```

2. Config Thymeleaf Template Engine
```java
@Configuration
public class ThymeleafConfig {
    // Read timezone and format from properties file.
    @Value("${spring.jackson.time-zone:}")
    private String timeZone;
    @Value("${spring.jackson.date-format:}")
    private String dateFormat;

    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine engine = new SpringTemplateEngine();

        Set<IDialect> dialects = engine.getDialects();
        dialects.forEach(i -> {
            if (i instanceof StandardDialect)
                // Set JavaScript serializer.
                ((StandardDialect) i).setJavaScriptSerializer(new CustomJavaScriptSerializer(true, timeZone, dateFormat));
        });
        engine.setDialects(dialects);

        engine.setTemplateResolver(templateResolver);
        return engine;
    }
}
```
