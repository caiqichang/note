# Max Number of Tomcat Concurrent

- Configuration of Spring Boot (the values are default)
```yaml
server:
  tomcat:
    threads:
      max: 200
    max-connections: 8192
    accept-count: 100
```
1. Max number of Concurrent depend on the minimum of `maxThreads` and `maxConnection`.
2. Max number of hang up request (over the max number of concurrent) = `maxConnections` + `acceptCount`.
3. Number of reject request = 
Number of request - [Max number of Concurrent]Min(`maxThreads`, `maxConnection`) 
                  - [Max number of hang up request](`maxConnections` + `acceptCount`)
4. If `maxConnection` set to `-1`, request will not be rejected, and will be hang up when over the max number of concurrent.

