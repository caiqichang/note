# JMeter测试SOAP

1. File -> Templates... -> Building a SOAP WebService Test Plan

2. HTTP Request Defaults 删除 Servcer Name or IP

3. HTTP Header Manager 删除 SoapAction 

4. Response Assertion 删除 Patterns to Test

5. 添加 Listener -> View Results Tree

6. 设置 Soap Request 相关参数

Path 后缀为 ?wsdl

Content Encoding 为 UTF-8

请求方法为 POST

Body Data 的格式：
```xml
<soap:Envelope 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <方法名 xmlns="">
      <参数名 xmlns=""><![CDATA[
        参数值
      ]]></参数名>
    </方法名>
  </soap:Body>
</soap:Envelope>
```
方法名必需有xmlns属性，且必需有值；参数名必需有xmlns属性，值可以为空；

CDATA里面的内容不需要转义，CDATA标签与参数名标签之间不能有空格
