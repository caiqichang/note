# Multiple DataSource

## Properties
- Use `jdbc-url` instead of `url`. 
  Different with single datasource. (due to `Hikari`)
- `key` is identity of each datasource.
```yml
datasource:
  list:
    - key: 
      username: 
      password: 
      jdbc-url: 
    - key: 
      username: 
      password: 
      jdbc-url: 
```
- Required if using `JPA`.
```yml
spring:
  jpa:
    database-platform: 
```

## DataSource Router
```java
public class DataSourceRouter {
    private static final ThreadLocal<String> currentDataSource = new ThreadLocal<>();

    public static void setCurrentDataSource(String key) {
        currentDataSource.set(key);
    }

    public static String getCurrentDataSource() {
        return currentDataSource.get();
    }
}
```

## RoutingDataSource
```java
public class RoutingDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        return DataSourceRouter.getCurrentDataSource();
    }
}
```

## DataSource Properties
- Reading from property file, like: `datasource.list`.
```java
@Component
@ConfigurationProperties(prefix = "datasource")
public class DataSourceProp {
    private List<Map<String, String>> list;

    public List<Map<String, String>> getList() {
        return list;
    }

    public void setList(List<Map<String, String>> list) {
        this.list = list;
    }
}
```

## DataSource Configuration
```java
@Configuration
public class DataSourceConfig {
    @Autowired
    private DataSourceProp dataSourceProp;

    @Bean
    public RoutingDataSource routingDataSource() {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        Map<Object, Object> dataSources = new HashMap<>();
        dataSourceProp.getList().forEach(i -> {
            dataSources.put(i.get("key"),
                    DataSourceBuilder.create()
                            .url(i.get("jdbc-url"))
                            .username(i.get("username"))
                            .password(i.get("password"))
                            .build()
            );
        });
        routingDataSource.setTargetDataSources(dataSources);
        return routingDataSource;
    }
}
```

## Usage
```java
DataSourceRouter.setCurrentDataSource(key);
// do something with database ...
```