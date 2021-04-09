# MySQL Authorization

1. User of MySQL is composed of 'name'@'host', 
like 'dev'@'127.0.0.1', 'opt'@'%' (use wildcard).
```sql
create user 'name'@'host' identified by 'password';

drop user 'name'@'host';

rename user 'name'@'host' to 'new_name'@'new_host'；
```

2. Authorizattion 
- Privilege: all, insert, select, alter ... (separated by `,`)
- Database.Table: `*.*` ... 
```sql
grant all on *.* to 'name'@'host';

revoke all on *.* from 'name'@'host';

show grants for 'name'@'host';
```
