# Multiple DataSource

## Properties
- Attention to use `jdbc-url` instead of `url`. 
  This is different with single datasource. (due to `Hikari` )
```yml
spring:
  datasource:
    db1:
      username:
      password:
      jdbc-url:
    db2:
      username:
      password:
      jdbc-url:
```

## DataSource Router
```java
public class DataSourceRouter {
    private static final ThreadLocal<String> currentDataSource = new ThreadLocal<>();

    public static void setCurrentDataSource(String dataSourceTag) {
        currentDataSource.set(dataSourceTag);
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

## DataSource Configuration
```java
public interface DataSourceTag {
    String DB1 = "db1";
    String DB2 = "db2";
}
```
- Must make one `@Primary` in multiple datasource. 
```java
@Configuration
public class DataSourceConfig {

    @Bean(DataSourceTag.DB1)
    @ConfigurationProperties("spring.datasource.db1")
    public DataSource db1() {
        return DataSourceBuilder.create().build();
    }

    @Bean(DataSourceTag.DB2)
    @ConfigurationProperties("spring.datasource.db2")
    public DataSource db2() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary 
    public RoutingDataSource routingDataSource(@Qualifier(DataSourceTag.DB1) DataSource db1, @Qualifier(DataSourceTag.DB2) DataSource db2) {
        RoutingDataSource routingDataSource =  new RoutingDataSource();
        routingDataSource.setTargetDataSources(Map.of(DataSourceTag.DB1, db1, DataSourceTag.DB2, db2));
        routingDataSource.setDefaultTargetDataSource(db1);  // optional
        return routingDataSource;
    }
}
```
- Make `RoutingDataSource` primary ensure to switch datasource dynamically.
  In this way, need to exclude datasource autoconfiguration, or it will cause circular dependency.
```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```

## Usage
```java
DataSourceRouter.setCurrentDataSource(DataSourceTag.DB2);
// do something with database ...
```