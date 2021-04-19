# Transaction

- ACID: Atomicity | Consistency | Isolation | Durability

- Dirty Read: Other transaction can `read` when this transaction has not commited.
  The data other transaction read is Dirty.
- Non-Repeatable Read: Other transaction can `update` when this transaction has not commited.
  The data this transaction read multiple times are different.
- Phantom Read: Other transaction can `insert` or `delete` when this transaction has not commited.
  The number of data this transaction read multiple times are different.

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| - | - | - | - |
| Read Uncommitted | true | true | true |
| Read Committed | false | true | true |
| Repeatable Read | false | false | true |
| Serializable | false | false | false |

## @Transactional
1. Annotate for `public` method or class (for all public methods in class).
2. Default rollback for `RuntimeException` and `Error`, do not rollback for `Checked Exception`.
   Custom by properties as follows.
3. Main Properties:
- rollbackFor, rollbackForClassName -- Exception that need rollback
- noRollbackFor, noRollbackForClassName -- Exception that do not need rollback.
- readOnly -- Default is false.
- timeout -- Unit is second, default is -1.
- propagation 
  - REQUIRED -- Join current transaction, if not exist, create new transaction.
  - SUPPORTS -- Join current transaction, if not exist, do not use transaction.
  - MANDATORY -- Join current transaction, if not exist, throw exception.
  - REQUIRES_NEW -- Stop current transaction, create new transaction and execute.
  - NOT_SUPPORTED -- Stop current transaction, execute without transaction.
  - NEVER -- Throw exception if current transaction exist, execute without transaction. 
  - NESTED -- Only for `JDBC DataSourceTranscationManager`.
- isolation -- `SQL Server` and `Oracle` is `Read Committed` by default, and `MySQL` is `Repeatable Read`
  - READ_UNCOMMITTED 
  - READ_COMMITTED
  - REPEATABLE_READ
  - SERIALIZABLE

## Rollback Manually
```java
@Transactional
public void method() {
    try {
        // ...
    } catch (Exception e) {
        // Because Spring transaction is based on exception, 
        // if exception is catched, rollback will not automatically.
        // Use this to rollback manually.
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();  
        // Do something with exception ...
    }
}
```