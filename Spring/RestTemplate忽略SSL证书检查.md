# RestTemplate忽略SSL证书检查 -- 基于Apache HttpClient

* 依赖
```xml
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpcore</artifactId>
    <version></version>
</dependency>
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version></version>
</dependency>
```

* 代码
```java
/**
 * 忽略SSL证书检查的RestTemplate
 *
 * @return 抛出异常则返回null
 */
public RestTemplate ignoreSslRestTemplate() {
    try {
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory(
                HttpClients.custom().setSSLSocketFactory(new SSLConnectionSocketFactory(
                        new SSLContextBuilder()
                                // 第一个参数为SSL证书
                                // 第二个参数为信任策略，返回true以信任所有证书
                                .loadTrustMaterial(null, (chain, authType) -> true)
                                .build(), 
                        // 关闭域名验证
                        NoopHostnameVerifier.INSTANCE
                )).build()
        ));
    } catch (NoSuchAlgorithmException | KeyStoreException | KeyManagementException e) {
        e.printStackTrace();
        return null;
    }
}
```