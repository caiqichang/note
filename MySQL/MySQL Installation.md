# MySQL Installation

> Install on Windows by ZIP archive.

1. Configuration File.
- `my.ini` or `my.cnf`
```ini
[mysqld]
datadir=D:\mysql_data
```

2. Initialize Data Directory.
```sh
# without password for root
mysql --initialize-insecure

# with random password (in `mysql_data\*.err`) for root
mysql --initialize
```

3. Install MySQL Service.
- Service Name: MySQL
```sh
mysqld --install MySQL --defaults-file="D:\mysql\my.ini"

sc start MySQL
```

5. Change password of root.
```sh
# without password
mysql -u root --skip-password

# with random password
mysql -u root -p
```
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NEW_PASSWORD';
```

