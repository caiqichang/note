# Git配置

文件 %username%/.gitconfig
```ini
[user]
	name = caiqichang
	email = cai_qichang@qq.com
[http]
	# proxy = http://127.0.0.1:1080/
[https]
	# proxy = http://127.0.0.1:1080/
[gui]
	encoding = utf-8
[core]
	askpass = 
```

- 使用cmd，例如：
  - git config --global user.name "caiqichang"

- 禁用 Git Credential Manager
  - git config --edit --system
  - 删除 helper = manager 行

- 直接在命令行输入用户名和密码，不使用弹窗方式
  - 配置文件增加 [core] askpass =
