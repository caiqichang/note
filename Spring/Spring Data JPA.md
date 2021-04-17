# Spring Data JPA

- Default value of column.
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

- Create time and update time.
```java
@EnableJpaAuditing
```
```java
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Entity {
    @CreatedDate
    private Date createTime;
    @LastModifiedDate
    private Date updateTime;
    // ...
}
```

- Auto Increment of ID.
Strategy:
1. AUTO 
2. TABLE -- using with `@TableGenerator` (recommand)
3. SEQUENCE -- using with `@SequenceGenerator` (MySQL unsupport)
4. IDENTITY -- depend on database (Oracle and SQL Server unsupport)
```java
@Entity
public class Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "GENERATOR_NAME")
    @TableGenerator(name = "UNIQUE_GENERATOR_NAME", table = "TABLE_NAME", 
            pkColumnName = "COLUMN_NAME_OF_ID", valueColumnName = "COLUMN_NAME_OF_ID_VALUE", 
            // Default initialValue is 0 and allocationSize is 50.
            initialValue = 0, allocationSize = 1,
            pkColumnValue = "VALUE_OF_ID_COLUMN")
    private Long id;
    // ...
}
```