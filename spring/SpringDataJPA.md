# Spring Data JPA

- 字段默认值
```java
@Entity
public class Entity {
    @PrePersist
    public void defaultValue() {
        if (column == null) column = value;
        // ...
    }
    // ...
}
```

- 创建时间和更新时间
```java
// 启用配置
@EnableJpaAuditing
```
```java
@Entity
// 启用监听器
@EntityListeners(AuditingEntityListener.class)
public class Entity {
    // 创建时间字段
    @CreatedDate
    private Date createTime;
    // 更新时间字段
    @LastModifiedDate
    private Date updateTime;
    // ...
}
```

- id自增
```java
@Entity
public class Entity {
    @Id
    // 生成策略 
    // AUTO 自动选择生成策略
    // TABLE 由表生成，与@TableGenerator联用
    // SEQUENCE 序列生成（MySQL不支持），与@SequenceGenerator联用
    // IDENTITY 数据库生成（Oracle不支持）
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "生成器名称")
    @TableGenerator(name = "唯一生成器名称", table = "表名", 
            pkColumnName = "主键列名", valueColumnName = "id值列名", 
            // 初值默认0，步长默认50
            initialValue = 0, allocationSize = 1,
            pkColumnValue = "主键值")
    private Long id;
    // ...
}
```