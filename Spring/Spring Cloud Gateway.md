# Spring Cloud Gateway

## Proxy Router
- Base on Java Code
```java
@Bean
public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder) {
    return routeLocatorBuilder
            .routes()

            // route api1
            .route("API1_NAME", route -> route
                    .path("/api1/**")
                    .filters(GatewayFilterSpec::preserveHostHeader)
                    .uri("http://localhost:8081/"))

            // route api2
            .route("API2_NAME", route -> route
                    .path("/api2/**")
                    .filters(GatewayFilterSpec::preserveHostHeader)
                    .uri("http://localhost:8082/"))
                    .rewritePath("/api2/?(?<segment>.*)", "/${segment}"))

            .build();
}
```

- Base on Properties File
```yaml
spring:
  cloud:
    gateway:
      routes:

        # route api1
        - id: API1_NAME
          predicates:
            - Path=/api1/**
          filters:
            - PreserveHostHeader
          uri: http://localhost:8081/

        # route api2
        - id: API2_NAME
          predicates:
            - Path=/api2/**
          filters:
            - PreserveHostHeader
            - RewritePath=/api2/?(?<segment>.*), /$\{segment}
          uri: http://localhost:8082/
```