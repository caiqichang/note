# Object Relational Mapping

* <a href="#springDataJpa">Spring Data JPA</a>
* <a href="#myBatis">MyBatis</a>
* <a href="#jdbcTemplate">JdbcTemplate</a>
* <a href="#springDataJdbc">Spring Data JDBC</a>

## <span id="springDataJpa">Spring Data JPA</span>
* 依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
* 实体
```java
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class JpaEntity {
    @Id
    private Integer id;
}
```
* 仓库
```java
@Repository
public interface JpaRepository extends JpaRepository<JpaEntity, Integer>, JpaSpecificationExecutor<JpaEntity> {}
```
* 配置
```yaml
spring:
  jpa:
    # 此配置也可以开启打印sql语句，但下面的配置优先
    show-sql: true
    properties:
      hibernate:
        # 打印sql语句
        show_sql: true
        # 格式化sql语句
        format_sql: true
    # 默认为true，spring boot启动时会warn；与懒加载有关
    open-in-view: false
    # 启动时连接不上数据库继续运行，仅jpa、jpa+mybatis有效
    database-platform: org.hibernate.dialect.MySQL8Dialect
logging:
  level:
    org:
      hibernate:
        type:
          descriptor:
            sql:
              # 打印参数值
              BasicBinder: trace
              # 打印返回值
              BasicExtractor: trace
```

## <span id="myBatis">MyBatis</span>
1. 依赖
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version></version>
</dependency>
```
2. 仓库
```java
@Repository
@Mapper
public interface MyBatisMapper {}
```
3. 配置
```yaml
logging:
  level:
    # 打印sql语句及参数值
    mapper包全限定名: trace
mybatis:
  configuration:
    # 映射驼峰式命名
    map-underscore-to-camel-case: true
```

## <span id="jdbcTemplate">JdbcTemplate</span>
不需要依赖，Spring Boot默认导入
* 实例
```java
// 直接注入默认使用配置的数据源
@Autowired
private JdbcTemplate jdbcTemplate;

// 注入配置的数据源
@Autowired
private DataSource dataSource;

// 使用new方式需要设置数据源，可以实现不同数据源动态切换
new JdbcTemplate(dataSource);
```
* 配置
```yaml
logging:
  level:
    org:
      springframework:
        jdbc:
          core: 
            # 打印sql语句
            JdbcTemplate: trace
            # 打印参数
            StatementCreatorUtils: trace
```

## <span id="springDataJdbc">Spring Data JDBC</span>
* 依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```
* 实体
```java
// 注意：与JPA的注解不同
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table
public class JdbcEntity {
    @Id
    private Integer id;
}
```
* 仓库
```java
@Repository
public interface JdbcRepository extends PagingAndSortingRepository<JdbcEntity, Integer> {}
```
* 配置
```yaml
logging:
  level:
    # 打印sql语句及参数值
    org:
      springframework:
        jdbc:
          core: trace
```