# Git Config

## Global
- Location: %USERNAME%/.gitconfig
```ini
[user]
	name = caiqichang
	email = cai_qichang@qq.com
[http]
	proxy = http://127.0.0.1:1080/
[https]
	proxy = http://127.0.0.1:1080/
[gui]
	encoding = utf-8
[core]
	autocrlf = false
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