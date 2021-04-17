# File Download Interface

- Parameter `filename` is required.
```java
@GetMapping("/download")
public ResponseEntity<InputStreamResource> download(HttpServletRequest request) {

    // ...

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
                        .body(new InputStreamResource(new FileInputStream(FILE_INSTANCE)));
}
```
