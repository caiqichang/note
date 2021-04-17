# Preprocess Properties

1. Setup processor in `src/resources/META-INF/spring.factories`.
```ini
org.springframework.boot.env.EnvironmentPostProcessor=CLASS_NAME_OF_PROCESSOR
```

2. Implement `EnvironmentPostProcessor`.
```java
package org.springframework.boot.env;
@FunctionalInterface
public interface EnvironmentPostProcessor {
	void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application);
}
```

3. Read and deal with properties in method `postProcessEnvironment`.
```java
Map<String, Object> newProperty = new HashMap<>();
environment.getPropertySources().forEach(i -> {
    // i is each properties file.
    if (i instanceof MapPropertySource) {
        Map<String, Object> map = ((MapPropertySource) i).getSource();
        map.forEach((k, v) -> {
            // k, v are key and value of each property.
            // map is Collections$UnmodifiableMap,
            // so to process properties in a new map first, then create a new property source and override the old
        });
    }
});
// Override, attention to use addFirst().
environment.getPropertySources().addFirst(new MapPropertySource(name, newProperty));

```
