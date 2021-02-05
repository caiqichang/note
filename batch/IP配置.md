# IP配置脚本

## 静态IP
```bat
rem encoding=GBK, run as administrator
netsh interface ip ^
set address name="以太网" ^
source=static ^
addr=192.168.10.20 ^
mask=255.255.255.0 ^
gateway=192.168.10.254
netsh interface ip ^
set dns name="以太网" ^
source=static ^
addr=202.96.128.166
pause
```

## 动态IP
```bat
rem encoding=GBK, run as administrator
netsh interface ip ^
set address name="以太网" ^
source=dhcp
netsh interface ip ^
set dns name="以太网" ^
source=dhcp
pause
```
