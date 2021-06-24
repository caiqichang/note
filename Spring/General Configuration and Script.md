# General Configuration and Script

## Configuration
- Because `.properties` do not support UTF-8, recommand to use `.yml` or `yaml`.
- application.yaml
```yaml
spring:
  profiles:
    active: dev
    include:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  servlet:
    multipart:
      max-file-size: -1
      max-request-size: -1
```

- application-dev.yaml
```yaml
server:
  port: 8080
  servlet:
    context-path: /api
spring:
  datasource:
    username: 
    password: 
    url: jdbc:mysql://localhost:3306/databaseName?serverTimezone=GMT%2B8
  pid:
    file: ./log/spring.pid
logging:
  file:
    name: ./log/spring.log
```

## Attention:
- Linux shell use `LF` instead of `CRLF`.
- Windows batch can not use Chinese file name, and must encoding to `GBK` (include comment).

## Script of Startup
1. Windows --> startup.bat
```bat
%1 mshta vbscript:CreateObject("WScript.Shell").Run("%~s0 ::",0,FALSE)(window.close)&&exit
set jarFile="application.jar"
jre\\bin\\javaw -Dfile.encoding=UTF-8 -jar %jarFile% --spring.profiles.active=prod
```

2. Linux --> startup.sh
```sh
#!/bin/sh
jarFile="application.jar"
jre/bin/java -Dfile.encoding=UTF-8 -jar $jarFile --spring.profiles.active=prod >/dev/null &
```

## Script of Shutdown
- Using PID file to shutdown application.
1. Windows --> shutdown.bat
- Spring invocate `@PreDestroy` and deletepid file only when receiving `sigint` or `sigterm`. 
  On Windows, only `Ctrl+C` in command line window or stop service can do that. 
```bat
set pidFile="log\\spring.pid"
if exist pidFile {
    set /p pid=<%pidFile%
    taskkill /f /pid %pid%
}
```

2. Linux --> shutdown.sh
- -9 sigstop -- Force kill, can not invocate `@PreDestroy` and delete pid file.
- -2 sigint
- -15 sigterm
```sh
#!/bin/sh
pidFile="log/spring.pid"
# Seconds for waiting to force kill. 
delayForceKill="10s"
if [ -f $pidFile ];then 
    kill -15 $(cat $pidFile)
    date +"%Y-%m-%d %H:%M:%S"
    echo "waiting for $delayForceKill ..."
    sleep $delayForceKill
    if [ -f $pidFile ];then
        kill -9 $(cat $pidFile)
    fi
fi
```
