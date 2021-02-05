# 调用WebService 基于JAX-WS

## 1. 通过wsdl链接生成相关Java代码
```
Intellij IDEA: 
1. 选中一个package，最好是空的
2. [Tools] -> [WebServices] -> [Generate Java Code From Wsdl]
3. 将生成的代码中的乱码注释删掉，不然编译和打包回报错
```
## 2. 调用代码
```java
JaxWsProxyFactoryBean jaxWsProxyFactoryBean = new JaxWsProxyFactoryBean();
// 设置wsdl链接
jaxWsProxyFactoryBean.setAddress(WSDL_ADDRESS);
// 设置接口类
jaxWsProxyFactoryBean.setServiceClass(API_CLASS.class);
// 接口代理
API_CLASS api = (API_CLASS) jaxWsProxyFactoryBean.create();
// 调用方法
api.METHOD(PARAM);
```
