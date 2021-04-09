# ContentLength Computation

```javascript
Buffer.byteLength(content, 'utf-8');
```
1. Computation of Request Header `Content-Length`.
2. Content-Type `multipart/form-data` or `application/octet-stream` does not need.
3. The second parameter is encoding base on operating system.
