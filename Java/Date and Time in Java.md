# Date and Time in Java

- `DataTimeFormatter` is singleton and thread safety to replace `SimpleDateFormat`.
- `LocalDateTime` is immutable and thread safety to replace `Calendar`.
- `Instant`, `Date`, `Calendar` all with timezone while `LocalDateTime` not.

## Usage
```java
// init
Date date = new Date();
Calendar calendar = Calendar.getInstance();
Instant instant = Instant.now();
LocalDateTime localDateTime = LocalDateTime.now();

// format
SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
simpleDateFormat.format(date);
// Calendar should convert to Date first, then format.
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
dateTimeFormatter.format(instant.atZone(ZoneId.systemDefault()));
dateTimeFormatter.format(localDateTime);

// convert
// Calendar  -> Date
date = calendar.getTime();
// Date -> Calendar
calendar.setTime(date);
// LocalDateTime -> Instant 
instant = localDateTime.atZone(ZoneId.systemDefault()).toInstant();
// Instant -> LocalDateTime
localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
// Date -> Instant
instant = date.toInstant();
// Instant -> Date
date = Date.from(instant);
// Calendar -> Instant
instant = calendar.toInstant();
// Instant -> Calendar
calendar.setTimeInMillis(instant.toEpochMilli());
// LocalDateTime should convert to Instant first, then convert with Date or Calendar.
```