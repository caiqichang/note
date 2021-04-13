# Tomcat Concurrent

- Spring Boot配置(以下数值为默认值)
```yaml
server:
  tomcat:
    threads:
      # 最大线程数
      max: 200
    # 最大连接数
    max-connections: 8192
    # 最大队列
    accept-count: 100
```
1. 最大并发数取决于`maxThreads`和`maxConnection`的最小值
2. 超过并发数被挂起的请求数 = `maxConnections` + `acceptCount`
3. 被拒绝的请求数 = 请求总数 - 最大并发数Min(`maxThreads`, `maxConnection`) - 挂起请求数(`maxConnections` + `acceptCount`)
4. 当`maxConnection`设置为`-1`时，连接数不限制，超过并发数的请求被挂起但不会被拒绝

