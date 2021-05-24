# Eureka

## Server
1. Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```
2. Configuration
```yml
spring:
  application:
    name: discovery
  cloud:
    loadbalancer:
      cache:
        enabled: false
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://localhost:${server.port:8080}${server.servlet.context-path:}/eureka
```
3. Enable
```java
@Configuration
@EnableEurekaServer
public class EurekaConfig {}
```

## Client 
1. Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```
2. Configuration
```yml
spring:
  application:
    name: service
  cloud:
    loadbalancer:
      cache:
        enabled: false
eureka:
  client:
    service-url:
      defaultZone: http://IP:PORT/CONTEXT/eureka
```
3. Enable
```java
@Configuration
@EnableDiscoveryClient
public class EurekaConfig {}
```

## Remote Invocation
1. Dependency
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```
2. Enable
```java
@Configuration
@EnableFeignClients(basePackageClasses = {...})
public class FeignConfig {}
```
3. Remote
- Attention: `contextId` will be used as bean name, if none, bean name is `name` (service name in eureka).
```java
@FeignClient(name = "client", contextId = "client_api1", path = "/client/api1")
public interface ApiRemote {
    @RequestMapping("/opt1")
    Response opt1(@RequestBody body, @RequestParam query);

    // ...
}
```
4. Usage
```java
@Autowired
ApiRemote apiremote;

Response response = apiRemote.opt1(body, query);
```