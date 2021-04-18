# Generate QRCode

1. Dependency
```xml
<dependency>
    <groupId>com.google.zxing</groupId>
    <artifactId>core</artifactId>
</dependency>
```

2. Generate image.
```java
Map<EncodeHintType, Object> hints = new HashMap<>();
// encoding of content
hints.put(EncodeHintType.CHARACTER_SET, StandardCharsets.UTF_8.name());
// margin of qrcode
hints.put(EncodeHintType.MARGIN, 1);

// Generate pixel matrix of qrcode.
BitMatrix bitMatrix = new MultiFormatWriter().encode(CONTENT, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);
// Generate image in memory.
BufferedImage bufferedImage = new BufferedImage(bitMatrix.getWidth(), bitMatrix.getHeight(), BufferedImage.TYPE_INT_RGB);

// Fill each pixel with color.
for (int x = 0; x < bitMatrix.getWidth(); x++) {
    for (int y = 0; y < bitMatrix.getHeight(); y++) {
        bufferedImage.setRGB(x, y, bitMatrix.get(x, y) ? Color.BLACK.getRGB() : Color.WHITE.getRGB());
    }
}
```

3. Generate to file or output stream.
- To file
```java
// TYPE -- file type, use ImageIO.getWriterFormatNames() to get available list.
// FILE_PATH -- output path
ImageIO.write(bufferedImage, TYPE, new FileOutputStream(new File(FILE_PATH)));
```
- To output stream (general for downloading)
```java
// TYPE -- file type, use ImageIO.getWriterFormatNames() to get available list.
ImageIO.write(bufferedImage, TYPE, ByteArrayOutputStream);
```

4. Download Interface
```java
public ResponseEntity<InputStreamResource> qrcode(HttpServletRequest request） {
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
            .header("Content-Disposition", "attachment; filename=\"" + FILE_NAME + "\"")
            .body(new InputStreamResource(new ByteArrayInputStream(outputStream.toByteArray())));
}
```
