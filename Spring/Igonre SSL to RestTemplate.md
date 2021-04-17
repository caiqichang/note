# Igonre SSL to RestTemplate

- Based on `Apache HttpClient`.

- Dependency
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

- Code
```java
/**
 * Generate RestTemplate instance that ignore SSL.
 */
public RestTemplate ignoreSslRestTemplate() {
    try {
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory(
                HttpClients.custom().setSSLSocketFactory(new SSLConnectionSocketFactory(
                        new SSLContextBuilder()
                                // Parameter 1 is certification of SSL.
                                // Parameter 2 is trust strategy of SSL, return true to trust all.
                                .loadTrustMaterial(null, (chain, authType) -> true)
                                .build(), 
                        // Close domain verifition.
                        NoopHostnameVerifier.INSTANCE
                )).build()
        ));
    } catch (NoSuchAlgorithmException | KeyStoreException | KeyManagementException e) {
        e.printStackTrace();
        return null;
    }
}
```