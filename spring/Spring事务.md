# Spring事务

ACID: Atomicity原子性 | Consistency一致性 | Isolation隔离性 | Durability持久性

<br/>

* dirty read: 其他事务在本事务未提交时可读，其他事务读取到的数据为脏数据
* non-repeatable read: 其他事务在本事务未提交时可update，本事务读取到的数据为脏数据(多次读取的数据不一致)
* phantom read: 其他事务在本事务未提交时可insert，本事务多次同条件查询获取数据数量不一致

<br/>

隔离级别
| isolation level | dirty read | non-repeatable read | phantom read |
|---|---|---|---|
| read uncommitted | true | true | true |
| read committed | false | true | true |
| repeatable read | false | false | true |
| serializable | false | false | false |

<br/>

## @Transactional
1. 注解 public 方法或类(对所有方法事务)
2. 默认对 RuntimeException 和 Error 进行回滚，checked exception不回滚，可通过以下属性更改
3. 主要属性:
>* rollbackFor, rollbackForClassName -- 需要回滚的异常类
>* noRollbackFor, noRollbackForClassName -- 不需要回滚的异常类
>* readOnly -- 只读事务，默认false
>* timeout -- 超时，单位秒，默认-1
>* propagation -- 传递性 
>>* REQUIRED -- 加入当前事务，当前不存在事务则新建事务
>>* SUPPORTS -- 加入当前事务，当前不存在事务则不启用事务
>>* MANDATORY -- 加入当前事务，当前不存在事务则抛出异常
>>* REQUIRES_NEW -- 暂停当前事务，创建新事务执行
>>* NOT_SUPPORTED -- 暂停当前事务，不启用事务执行
>>* NEVER -- 暂停当前事务，当前事务存在抛出异常，不启用事务执行
>>* NESTED -- 内嵌事务，仅适用于JDBC DataSourceTranscationManager
>* isolation -- 隔离级别SQL Server、Oracle默认为read committed，MySQL默认为repeatable read
>>* READ_UNCOMMITTED 
>>* READ_COMMITTED
>>* REPEATABLE_READ
>>* SERIALIZABLE

<br/>

## 手动回滚
```java
@Transactional
public void method() {
    try {
        // ...
    } catch (Exception e) {
        // 捕获异常不会回滚，手动回滚
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();  
        // ...
    }
}
```