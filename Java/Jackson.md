# Jackson

```java
ObjectMapper objectMapper = new ObjectMapper();

// Default is true. 
// It seems be `false` in RestTemplate's Response and RestController's Parameter.
objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

// If POJO has properties that is type of nested class, the nested class must be public static and with non-argument constructor.
// Recommend to create non-argument constructor for POJO.
objectMapper.readValue(jsonString, POJO.class);
```