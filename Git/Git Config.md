# Git Config

## Global
- Location: %USERNAME%/.gitconfig
```ini
[core]
    autocrlf = false
[gui]
    encoding = utf-8
[user]
    name = caiqichang
    email = cai_qichang@qq.com
[http]
    # proxy = http://127.0.0.1:1080/
[https]
    # proxy = http://127.0.0.1:1080/
```
- set
```
git config --global KEY(e.g. user.name) VALUE
```
- list
```
git config --global --list
```

## System
- list
```
git config --system --list
```