# SOAP Webservice

> Base on Apache CXF (JAX-WS)

1. Dependency
```xml
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-spring-boot-starter-jaxws</artifactId>
    <version></version>
</dependency>
```

2. Configuration
```java
@Configuration
public class WebServiceConfig {
    // Bean name must be cxfServlet.
    @Bean("cxfServlet")
    public ServletRegistrationBean<CXFServlet> servletRegistrationBean() {
        // Context path of webservice. Do not set to /* generally, or it will override DispatcherServlet.
        return new ServletRegistrationBean<>(new CXFServlet(), WEBSERVER_PATH + "/*");
    }

    // use for publish webservice endpoint
    @Bean(Bus.DEFAULT_BUS_ID)
    public SpringBus springBus() {
        return new SpringBus();
    }
}
```

3. Webservice Interface
```java
@Component
@WebService
public class WEBSERVICE_INTERFACE {
    @WebMethod(operationName = "METHOD_NAME")
    public RETURN_TYPE METHOD_NAME(@WebParam(name = "PARAM_NAME") PARAM_TYPE param) {
        // ...
    }
}
```

4. Publish Webservice Endpoint
```java
@Configuration
public class WebServiceEndpoint {
    // Config multiple bean to publish more interface.
    @Bean
    public Endpoint INTERFACE_ENDPOINT(SpringBus springBus, WEBSERVICE_INTERFACE wi) {
        // Generally inject interface by bean. Also can new an instance.
        EndpointImpl endpoint = new EndpointImpl(springBus, wi);
        // Path of interface.
        endpoint.publish(INTERFACE_URL);
        return endpoint;
    }
}
```

5. WSDL of Webservice
```
GET http://{IP}:{PORT}{CONTENT_PATH}{WEBSERVER_PATH}{INTERFACE_URL}?wsdl
```

6. Content of Soap Request
- Request
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
- Response
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
