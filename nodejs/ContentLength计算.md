# Content-Length 计算

- multipart/form-data 或 application/octet-stream 不需要设置该请求头

- 计算方法：
```javascript
// 第二个参数为编码，通常为utf-8，默认为系统编码
Buffer.byteLength(content, 'utf-8');
```