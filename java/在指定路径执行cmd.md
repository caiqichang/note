# 在指定路径执行cmd

```java
// 参数1--cmd命令拼接数组 /c close关闭命令行 /k keep保持命令行
// arrays--环境变量，path--指定程序运所在路径
Runtime.getRuntime().exec(new String[]{"cmd.exe", "/c", "test.bat"}, arrays, path);
```
