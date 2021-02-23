# MySQL权限配置

- 用户由 name@host 组成，例如：'dev'@'123.123.1.1'、'ops'@'%'
```sql
-- 创建用户
create user 'name'@'host' identified by 'password';

-- 删除用户
drop user 'name'@'host';

-- 重命名
rename user 'name'@'host' to 'new_name'@'new_host'；

-- 授权 
-- 具体权限：all 改为 insert, select 等，多个以逗号分隔
-- *.* 为所有数据库权限 
grant all on db_name.* to 'name'@'host';

-- 查看权限
show grants for 'name'@'host';

-- 撤销权限
revoke all on db_name.* from 'name'@'host';
```
