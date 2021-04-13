# SpringBoot开发SOAP -- 基于Apache CXF (JAX-WS)

## 1. 依赖
```xml
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-spring-boot-starter-jaxws</artifactId>
    <version></version>
</dependency>
```

## 2. 配置类
```java
@Configuration
public class WebServiceConfig {
    // bean名称必需为cxfServlet
    @Bean("cxfServlet")
    public ServletRegistrationBean<CXFServlet> servletRegistrationBean() {
        // 通常webservice的context-path不要设置为 /* ，避免覆盖DispatcherServlet
        return new ServletRegistrationBean<>(new CXFServlet(), WEBSERVER_PATH + "/*");
    }

    // 用于发布webservice端点
    @Bean(Bus.DEFAULT_BUS_ID)
    public SpringBus springBus() {
        return new SpringBus();
    }
}
```

## 3. WebService接口
```java
@Component
@WebService
public class WEBSERVICE_INTERFACE {
    @WebMethod
    public RETURN_TYPE METHOD_NAME(@WebParam(name = "PARAM_NAME") PARAM_TYPE param) {
        // ...
    }
}
```

## 4. 发布webservice端点
```java
@Configuration
public class WebServiceEndpoint {
    // 发布多个webservice接口需要配置多个bean
    @Bean
    public Endpoint INTERFACE_ENDPOINT(SpringBus springBus, WEBSERVICE_INTERFACE wi) {
        // 通常将webservice接口的bean通过参数注入
        EndpointImpl endpoint = new EndpointImpl(springBus, wi);
        // 访问该接口的URL
        endpoint.publish(INTERFACE_URL);
        return endpoint;
    }
}
```

## 5. 接口地址
```
GET http://{IP}:{PORT}{CONTENT_PATH}{WEBSERVER_PATH}{INTERFACE_URL}?wsdl
```

### 6. Soap请求报文格式
```xml
POST http://{IP}:{PORT}{CONTENT_PATH}{WEBSERVER_PATH}{INTERFACE_URL}?wsdl
Content-Type: text/xml; charset=UTF-8

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <METHOD xmlns="TARGET_NAMESPACE OR TNS">
            <PARAM xmlns=""><![CDATA[

            ]]></PARAM>
        </METHOD>
    </soap:Body>
</soap:Envelope>

###
```
通常响应格式
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <ns2:RESPONSE_TYPE xmlns:ns2="TARGET_NAMESPACE OR TNS">
            <return>

            </return>
        </ns2:RESPONSE_TYPE>
    </soap:Body>
</soap:Envelope>
```
