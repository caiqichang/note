# Clear Database's Data

- MySQL
```sql
-- Change database name here.
USE DATABASE_TO_CLEAR;
DROP PROCEDURE IF EXISTS CLEAR_DATABASE;
DELIMITER ;;
CREATE PROCEDURE CLEAR_DATABASE()
BEGIN
    CREATE TEMPORARY TABLE tables_to_clear (
        table_name VARCHAR(100)
    );
    INSERT INTO tables_to_clear
    SELECT TABLE_NAME FROM information_schema.TABLES
    -- Change database name here, and exclude tables that do not need to clear.
    WHERE TABLE_SCHEMA = 'DATABASE_TO_CLEAR' AND TABLE_NAME NOT IN ('TABLE_TO_EXCLUDE');

    SET @count = (SELECT COUNT(*) FROM tables_to_clear);
    WHILE @count > 0 DO
        SET @sql = CONCAT('DELETE FROM ', (SELECT table_name FROM tables_to_clear LIMIT 1), ' WHERE 1=1');
        PREPARE query FROM @sql;
        EXECUTE query;

        SET @count = @count - 1;
    END WHILE;

    DROP TEMPORARY TABLE tables_to_clear;
END ;;
CALL clear();
DROP PROCEDURE CLEAR_DATABASE;
DELIMITER ;
```

- SQL Server
```sql
-- Change database name here.
USE DATABASE_TO_CLEAR;
DECLARE @count AS INT;
DECLARE @table As VARCHAR(100);

CREATE TABLE #tables_to_clear (
    table_name VARCHAR(100)
);
INSERT INTO #tables_to_clear
-- Change database name here.
SELECT TABLE_NAME FROM DATABASE_TO_CLEAR.INFORMATION_SCHEMA.TABLES
-- Exclude tables that do not need to clear.
WHERE TABLE_NAME NOT IN ('TABLE_TO_EXCLUDE');

SET @count = (SELECT COUNT(*) FROM #tables_to_clear);
WHILE @count > 0
BEGIN
    SET @table = (SELECT TOP 1 table_name FROM #tables_to_clear);
    EXEC('DELETE FROM ' + @table + ' WHERE 1=1');

    SET @count = @count - 1;
END;

DROP TABLE #tables_to_clear;
```