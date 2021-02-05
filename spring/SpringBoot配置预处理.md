# SpringBoot配置预处理

## 1. 文件 src/resources/META-INF/spring-factories
```ini
org.springframework.boot.env.EnvironmentPostProcessor=预处理类的全限定名称
```

## 2. 预处理类需要实现以下接口
```java
package org.springframework.boot.env;
@FunctionalInterface
public interface EnvironmentPostProcessor {
	void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application);
}
```

## 3. 对配置文件的配置项做预处理
```java
Map<String, Object> newProperty = new HashMap<>();
environment.getPropertySources().forEach(i -> {
    // i为每个配置文件
    if (i instanceof MapPropertySource) {
        Map<String, Object> map = ((MapPropertySource) i).getSource();
        map.forEach((k, v) -> {
            // k,v为配置文件中每个配置的键和值
            // 该map为Collections$UnmodifiableMap，不可修改
            // 先将配置处理后放到newProperty，再覆盖配置
        });
    }
});
// 覆盖配置
environment.getPropertySources().addFirst(new MapPropertySource(name, newProperty));

```
