# WebService Client for Java (base on JAX-WS)

1. Generate Code from `WSDL` (pay attention to file encoding). 

2. Call API by Java. 
```java
JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
jaxWsProxyFactoryBean.setAddress(WSDL);
jaxWsProxyFactoryBean.setServiceClass(API_CLASS.class);
API_CLASS api = (API_CLASS) jaxWsProxyFactoryBean.create();
api.METHOD(PARAM);
```