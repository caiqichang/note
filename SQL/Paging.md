# Paging

- MySQL
  - Page number is 0-based.
```sql
SELECT * FROM (
    SELECT (@row := @row + 1) AS ROW_COLUMN, BUSINESS_TABLE.* FROM (SELECT @row := 0) AS ROW_TABLE, (
        -- business query here
    ) AS BUSINESS_TABLE
) AS BUSINESS_TABLE_WITH_ROW WHERE ROW_COLUMN > (#{PAGE_NUMBER} * #{PAGE_SIZE}) LIMIT #{PAGE_SIZE};
```

- SQL Server
- Page number is 0-based.
```sql
SELECT TOP #{PAGE_SIZE} * FROM ( 
    -- attention to set order by
    SELECT ROW_NUMBER() OVER (ORDER BY ... ) AS ROW_COLUMN, BUSINESS_TABLE.* FROM (
        -- business query here
    ) AS BUSINESS_TABLE
) AS BUSINESS_TABLE_WITH_ROW WHERE ROW_COLUMN > (#{PAGE_NUMBER} * #{PAGE_SIZE});
```