# Generate Thumbnail Image in Memory

1. Dependency
```xml
<dependency>
    <groupId>net.coobird</groupId>
    <artifactId>thumbnailator</artifactId>
    <version></version>
</dependency>
```

2. Interface
```java
@GetMapping("/thumb")
public ResponseEntity<byte[]> thumbnail(HttpServletRequest request) {

    // ...

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    // Compress to size WIDTH * HEIGHT, according to original scale (depend on longest side).
    Thumbnails.of(FILE_INSTANCE).size(WIDTH, HEIGHT).toOutputStream(outputStream);

    // deal with file name
    String userAgent = Optional.ofNullable(request.getHeader("User-Agent")).orElse("");
    if (userAgent.contains("MSIE") || userAgent.contains("Trident")) {
        // IE
        FILENAME = URLEncoder.encode(FILENAME, StandardCharsets.UTF_8.name());
    } else {
        FILENAME = new String(FILENAME.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
    }
    
    return ResponseEntity.status(HttpStatus.OK)
                            .header("Content-Disposition", "attachment; filename=\"" + FILENAME + "\"")
                            .body(outputStream.toByteArray());
}
```
