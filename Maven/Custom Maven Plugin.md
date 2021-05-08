# Custom Maven Plugin

- Project always named as `xxx-maven-plugin`.

- Packaging (at pom.xml) as `maven-plugin`.
```xml
<packaging>maven-plugin</packaging>
```

- Dependency
```xml
<dependency>
    <groupId>org.apache.maven</groupId>
    <artifactId>maven-plugin-api</artifactId>
    <version></version>
</dependency>
<dependency>
    <groupId>org.apache.maven.plugin-tools</groupId>
    <artifactId>maven-plugin-annotations</artifactId>
    <version></version>
    <scope>provided</scope>
</dependency>
```

- Plugin (recommend, required if using Java 11)
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-plugin-plugin</artifactId>
    <version></version>
</plugin>
```

- Mojo (Maven Goal)
```java
@Mojo(name = "goal-name", defaultPhase = LifecyclePhase)
public class ExMojo extends AbstractMojo {

    @Parameter(property = "param-name", defaultValue = "param-value")
    private String param;

    public void execute() {
        // ...

        getLog().info("");
    }
}
```

- LifeCycle of Maven
  - clean: pre-clean -> clean -> post-clean
  - validate
  - compile: initialize -> generate-sources -> process-sources 
    -> generate-resources -> process-resources -> compile -> process-classes
  - test: generate-test-sources -> process-test-sources 
    -> generate-test-resources -> process-test-resources 
    -> test-compile -> process-test-classes -> test
  - package: prepare-package -> package
  - verify: pre-integration-test -> integration-test -> post-integration-test -> verify
  - install
  - deploy
  - site: pre-site -> site -> post-site -> site-deploy

- Use `mvn install` to install plugin to local repository.

- Using in other project:
```xml
<plugin>
    <groupId></groupId>
    <artifactId>xxx-maven-plugin</artifactId>
    <version></version>
    <executions>
        <execution>
            <goals>
                <goal>goal-name</goal>
            </goals>
            <configuration>
                <param-name>param-value</param-name>
            </configuration>
        </execution>
    </executions>
</plugin>
```
