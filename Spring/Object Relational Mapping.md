# Object Relational Mapping

## Spring Data JPA
- Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
- Entity
```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class JpaEntity {
    @Id
    private Integer id;
}
```
- Repository
```java
@Repository
public interface JpaRepository extends JpaRepository<JpaEntity, Integer>, JpaSpecificationExecutor<JpaEntity> {}
```
- Config
```yaml
spring:
  jpa:
    # If true, Spring boot will print a warning log after start. It is relate to Lazy Loading.
    open-in-view: false
    # This enable to keep running if disconnect to database when Spring Boot start. (only for JPA or JPA+Mybatis)
    database-platform: org.hibernate.dialect.MySQL8Dialect
```

## MyBatis
- Depandency
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version></version>
</dependency>
```
- Repository
```java
@Repository
@Mapper
public interface MyBatisMapper {}
```
- Config
```yaml
mybatis:
  configuration:
    map-underscore-to-camel-case: true
```

## JdbcTemplate
- Example
```java
// If inject directly,it will use the default datasource. 
@Autowired
private JdbcTemplate jdbcTemplate;

// Inject default datasource to create one.
@Autowired
private DataSource dataSource;
new JdbcTemplate(dataSource);

// Create datasource and new one.
new JdbcTemplate(new Datasource());
```

## Spring Data JDBC
1. Attention that this is different and conflict with JPA.
- Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```
- Entity
1. attention: the annotations are different with JPA.
```java
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class JdbcEntity {
    @Id
    private Integer id;
}
```
- Repository
```java
@Repository
public interface JdbcRepository extends PagingAndSortingRepository<JdbcEntity, Integer> {}
```