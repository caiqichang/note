# File Upload

## Setup size of request and file.
- Config of Spring Boot (value are default)
```yaml
spring:
  servlet:
    multipart:
      # Set -1 to unlimit
      max-file-size: 1MB
      # Set -1 to unlimit.
      max-request-size: 10MB
```
- Config of Nginx (value is default)
```ini
# Available in http, server and location. Return 413 if over. Set 0 to unlimit.
client_max_body_size 1m;
```

## Interface
- application/octet-stream -- in this type, file data is in request body, it can only upload one and can not get file name.
```java
// Whether with @RequestParam or not, otherParam is always in part query of URL.
@PostMapping("/upload")
@ResponseBody
public ResponseEntity upload(String otherParam, HttpServletRequest request) {
    // save file
    FileCopyUtils.copy(request.getInputStream(), new FileOutputStream(TARGET_FILE));

    //...
}
```

- multipart/form-data -- (recommand) in this tpye, multi file are available and can get file name.
```java
// Whether with @RequestParam or not, otherParam will combine with same param in form separate by , (comma).
@PostMapping("/upload")
@ResponseBody
public ResponseEntity upload(String otherParam, List<MultipartFile> files) {
    files.forEach(file -> {
        // get file name
        file.getOriginalFilename();
        // save file, PARAM can be Path or File but must absolute.
        file.transferTo(PARAM);

        // ...
    });

    //...
}
```

## Request of `multipart/form-data `
1. Request Header
- Content-Type: multipart/form-data; boundary=BOUNDARY
  - BOUNDARY -- any string

- Request Body
  - Normal Parameter 
```
--BOUNDARY
Content-Disposition: form-data; name="NAME_OF_PARAMETER"

VALUE_OF_PARAMETER
```
2. File Parameter
```
--BOUNDARY
Content-Disposition: form-data; name="NAME_OF_PARAMETER"; filename="FILE_NAME"

DATA_OF_FILE
```
3. End
```
--BOUNDARY--
```
Attention to wrap with `\r\n`. 

## Invocate by Jquery Ajax 
- application/octet-stream
```javascript
$.ajax({
    url: API_URL,
    method: 'POST',
    data: FILE_DATA,  // document.querySelector(selector).files[0]
    processData: false,  // required
    beforeSend() {},
    complete() {},
    success(data) {},
    error(error) {},
    xhr() {
        // file upload progress
        let xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', event => {
            // rate of upload progress
            let rate = Math.round(event.loaded / event.total * 100) + '%';
        });
        return xhr;
    },
});
```

- multipart/form-data
```javascript
let formData = new FormDate();
formData.append('otherParam', otherParam);
// Multi file use the same parameter name
formData.append('files', domElemt.files[0]);
formData.append('files', domElemt.files[1]);
formData.append('files', domElemt1.files[0]);

$.ajax({
    url: API_URL,
    method: 'POST',
    data: formData,
    processData: false,  // required
    contentType: false,  // required
    beforeSend() {},
    complete() {},
    success(data) {},
    error(error) {},
    xhr() {
        // file upload progress
        let xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', event => {
            // rate of upload progress
            let rate = Math.round(event.loaded / event.total * 100) + '%';
        });
        return xhr;
    },
});
```

## Invocate by RestTemplate
- application/octet-stream
```java
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

HttpEntity<FileSystemResource> entity = new HttpEntity<>(new FileSystemResource(FILE), headers);

ResponseEntity<String> response = new RestTemplate().postForEntity(API_URL, entity, String.class);
```

- multipart/form-data
```java
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.MULTIPART_FORM_DATA);

MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
formData.add("files", new FileSystemResource(FILE1));
formData.add("files", new FileSystemResource(FILE2)));
formData.add("otherParam", PARAM_VALUE);

HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(formData, headers);

ResponseEntity<String> response = new RestTemplate().postForEntity(API_URL, entity, String.class);
```

## Invocate by Node.js
- application/octet-stream
```javascript
const http = require('http');
const fs = require('fs');

let request = http.request({
    protocol: 'http:',
    host: '127.0.0.1',
    port: 8080,
    method: 'POST',
    path: '/test/upload',
    headers: {
        'Content-Type': 'application/octet-stream',
    },
}, response => {
    console.log(response.statusCode);
});

request.write(fs.readFileSync('E:/file1'));
request.end();
```

- multipart/form-data
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path'); 

const boundary = Math.round(Math.random() * (Math.pow(10, 8)));

let request = http.request({
    protocol: 'http:',
    host: '127.0.0.1',
    port: 8080,
    method: 'POST',
    path: '/test/upload',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
    },
}, response => {
    console.log(response.statusCode);
});

request.write(
    '--' + boundary + '\r\n' 
    + 'Content-Disposition: form-data; name="otherParam"\r\n'
    + '\r\n');
request.write(PARAM_VALUE);
request.write('\r\n');

['E:/file1', 'E:/file2'].forEach(file => {
    let content = fs.readFileSync(file);
    request.write(
        '--' + boundary + '\r\n' 
        + 'Content-Disposition: form-data; name="files"; filename="' + path.basename(file) + '"\r\n'
        + '\r\n');
    request.write(content);
    request.write('\r\n');
});

request.write('--' + boundary + '--');
request.end();
```

## Transfer to outer interface and never save file.

- multipart/form-data to application/octet-stream
```java
// Reference to RestTemplate sending application/octet-stream request.
// Trans MultipartFile to ByteArrayResource, and use ByteArrayResource for request body.
HttpEntity<ByteArrayResource> entity = new HttpEntity<>(new ByteArrayResource(MultipartFile.getBytes()), headers);
```

- multipart/form-data to multipart/form-data
```java
// Reference to RestTemplate sending multipart/form-data request.
// Trans MultipartFile to ByteArrayResource, use ByteArrayResource to replace FileSystemResource.
// Require to override getFilename(), because Multipart File need file name.
formData.add("files", new ByteArrayResource(MultipartFile.getBytes()) {
    @Override
    public String getFilename() {
        return MultipartFile.getOriginalFilename();
    }
});
```

- application/octet-stream to multipart/form-data
```java
// Reference to RestTemplate sending multipart/form-data request.
// Trans HttpServletRequest.getInputStream() to ByteArrayOutputStream, and use ByteArrayResource for request body.
// Require to override getFilename(), because Multipart File need file name (attention that octet-stream without file name).
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
FileCopyUtils.copy(HttpServletRequest.getInputStream(), outputStream);
HttpEntity<ByteArrayResource> entity = new HttpEntity<>(new ByteArrayResource(outputStream.toByteArray()) {
    @Override
    public String getFilename() {
        return "CUSTOM_FILE_NAME";
    }
}, headers);
```

- application/octet-stream to application/octet-stream
```java
// Reference to RestTemplate sending application/octet-stream request.
// Trans HttpServletRequest.getInputStream() to ByteArrayOutputStream, and use ByteArrayResource for request body.
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
FileCopyUtils.copy(HttpServletRequest.getInputStream(), outputStream);
HttpEntity<ByteArrayResource> entity = new HttpEntity<>(new ByteArrayResource(outputStream.toByteArray()), headers);
```
