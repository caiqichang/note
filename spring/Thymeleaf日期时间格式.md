# Thymeleaf 全局JS日期时间格式配置

使用配置文件的日期时间格式和时区渲染JS时间变量<br/>
同理可自定义CSS序列化器

## 1. 自定义JS序列化器
参照默认序列化器 org.thymeleaf.standard.serializer.StandardJavaScriptSerializer
```java
public final class CustomJavaScriptSerializer implements IStandardJavaScriptSerializer {
    // 定义时区和格式变量
    private static String timeZone;
    private static String dateFormat;

    // ...

    public ExJavaScriptSerializer(final boolean useJacksonIfAvailable, String timeZone, String dateFormat) {
        super();
        // 修改构造方法，初始化时区和格式
        CustomJavaScriptSerializer.timeZone = timeZone;
        CustomJavaScriptSerializer.dateFormat = dateFormat;

        // ...
    }

    // ...

    private static final class JacksonStandardJavaScriptSerializer implements IStandardJavaScriptSerializer {
        private final ObjectMapper mapper;
        JacksonStandardJavaScriptSerializer(final String jacksonPrefix) {
            // ..

            // 修改静态内部类的构造方法，在方法体最后设置Jackson的时区和格式
            this.mapper.setTimeZone(StringUtils.isEmpty(timeZone) ? TimeZone.getDefault() : TimeZone.getTimeZone(timeZone));
            this.mapper.setDateFormat(StringUtils.isEmpty(dateFormat) ? new JacksonThymeleafISO8601DateFormat() : new SimpleDateFormat(dateFormat));
        }

        // ...
    }

    //...
}
```

## 2. 配置模板引擎
```java
@Configuration
public class ThymeleafConfig {
    // 读取配置文件的时区和格式
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
                // 设置js序列化器
                ((StandardDialect) i).setJavaScriptSerializer(new CustomJavaScriptSerializer(true, timeZone, dateFormat));
        });
        engine.setDialects(dialects);

        engine.setTemplateResolver(templateResolver);
        return engine;
    }
}
```
