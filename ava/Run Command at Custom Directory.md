# Run Command at Custom Directory

```java
Runtime.getRuntime().exec(new String[]{"cmd.exe", "/c", "COMMAND"}, arrays, path);
```
- param 1: string array of command, sometime is --
 `cmd.exe` + `/c` (close terminal or `/k` to keep) + command to run
- param 2: environment variable array
- param 3: custom directory (context) to run command
