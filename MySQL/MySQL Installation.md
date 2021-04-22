# MySQL Installation

> Install on Windows by ZIP archive.

1. Configuration File.
- BASEDIR -- Install Directory
- `C:\my.ini` `C:\my.cnf` or `BASEDIR\my.ini` `BASEDIR\my.cnf`
```ini
[mysqld]
datadir=D:\mysql_data
```

2. Initialize Data Directory.
- Without password for root.
```
mysql --initialize-insecure
```
- With random password (in `mysql_data\*.err`) for root.
```
mysql --initialize
```

3. Install MySQL Service.
- Service Name: MySQL
```
mysqld --install MySQL
```
```
sc start MySQL
```

5. Change password of root.
- Without password.
```
mysql -u root --skip-password
```
- With random password.
```
mysql -u root -p
```
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NEW_PASSWORD';
```

