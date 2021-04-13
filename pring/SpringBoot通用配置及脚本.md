# Spring Boot 通用配置及脚本

## 配置文件
.properties文件不支持UTF-8编码，默认使用.yaml或.yml文件
- application.yaml
```yaml
spring:
  profiles:
    # 非通用配置文件，端口、context-path、数据库连接信息等
    # 通常开发环境下为dev，测试环境为test，生产环境为prod
    active: dev
    # 其他通用配置文件
    include:
  main:
    # 关闭banner
    banner-mode: off
  # json默认时间日期格式和时区，模板（thymeleaf）中无效
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  servlet:
    multipart:
      # 文件大小，设置为-1则不限制，默认1MB
      max-file-size: -1
      # 单次请求大小，设置为-1则不限制，默认10MB
      max-request-size: -1
logging:
  level:
    org:
      springframework:
        web:
          servlet:
            mvc:
              method:
                annotation:
                  # 关闭启动时打印接口url
                  RequestMappingHandlerMapping:hibernate: off
```

- application-dev.yaml
```yaml
server:
  # 端口
  port: 8080
  servlet:
    # base url
    context-path: /api
spring:
  # 数据源不再需要设置驱动类driver-class
  datasource:
    # 数据库用户名
    username: dev
    # 数据库密码，通常需要加密
    password: AES[加密后的密文]
    # 数据库连接url，mysql连接需要设置时区参数
    url: jdbc:mysql://localhost:3306/databaseName?serverTimezone=GMT%2B8
  # pid文件位置，需要在启动类中启用
  pid:
    file: ./log/config.pid
logging:
  # 日志文件位置
  file:
    name: ./log/config.log
```

<br/>

> ## 注：
> - shell脚本使用 LF 而不是 CRLF
> - batch脚本文件名不能带中文，如果内容有中文（包括注释）编码必须为GBK

<br/>

## 启动脚本
1. windows --> startup.bat
```bat
%1 mshta vbscript:CreateObject("WScript.Shell").Run("%~s0 ::",0,FALSE)(window.close)&&exit
set jarFile="application.jar"
jre\\bin\\javaw -Dfile.encoding=UTF-8 -jar %jarFile% --spring.profiles.active=prod
```

2. linux --> startup.sh
```sh
#!/bin/sh
# jar包文件
jarFile="application.jar"
jre/bin/java -Dfile.encoding=UTF-8 -jar $jarFile --spring.profiles.active=prod >/dev/null &
```

<br/>

## 关闭脚本 
需要利用生成的pid文件
1. windows --> shutdown.bat
- spring通过接收系统的sigint或sigterm信号实现@PreDestroy，并删除pid文件
- windows只能通过cmd窗口的ctrl+c发送信号
- 可以安装为服务，服务停止时会发送信号
```bat
set pidFile="log\\spring.pid"
if exist pidFile {
	set /p pid=<%pidFile%
	taskkill /f /pid %pid%
	del /f %pidFile%
}
```

2. linux --> shutdown.sh
- -9 sigstop 强制关闭 无法触发@PreDestroy及删除pid文件
- -2 sigint
- -15 sigterm
```sh
#!/bin/sh
# pid文件
pidFile="log/spring.pid"
# 强制关闭延时时间
delayForceKill="30s"
if [ -f $pidFile ];then 
	kill -15 $(cat $pidFile)
	date +"%Y-%m-%d %H:%M:%S"
	echo "waiting for $delayForceKill ..."
	sleep $delayForceKill
	if [ -f $pidFile ];then
		kill -9 $(cat $pidFile)
		rm -f $pidFile
	fi
fi
```

<br/>

## 开机启动
1. windows
- 创建启动脚本的快捷方式到目录
```
%username%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

2. linux
- todo

<br/>

## 安装为服务
1. windows 
- Spring推荐使用[winsw](https://github.com/winsw/winsw)
- 注：windows service无法使用GUI

2. linux
- todo
