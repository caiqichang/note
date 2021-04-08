# Script of IP Setting

> Must run as administrator and encode as GBK.

## set static ip
```bat
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

## set dynamic ip
```bat
netsh interface ip ^
set address name="以太网" ^
source=dhcp
netsh interface ip ^
set dns name="以太网" ^
source=dhcp
pause
```