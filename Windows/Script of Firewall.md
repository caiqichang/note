# Script of Firewall

> Must run as administrator.

## set off 
```bat
netsh advfirewall ^
set allprofiles state off
pause
```

## set on
```bat
netsh advfirewall ^
set allprofiles state on
pause
```