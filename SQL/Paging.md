# Paging

- MySQL
  - 0-base
```sql
SELECT * FROM (
    SELECT (@row:=@row+1) AS rownum,
        b.*, ...
    FROM (SELECT @row:=-1) AS RowTable,
        business AS b
    LEFT JOIN ...
    WHERE ...
    ORDER BY ...
) AS PageData WHERE PageData.rownum >= (${PageNumber} * ${PageSize}) LIMIT ${PageSize};

```

- SQL Server
```sql

```