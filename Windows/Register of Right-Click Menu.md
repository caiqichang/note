# Register of Right-Click Menu

## right-click at file
1. Location: HKEY_CLASSES_ROOT/*/shell
2. New item: Menu item name
3. New sub item: command
4. Set value: "absolute path of executable application" "%1"

## right-click at folder
1. Location: HKEY_CLASSES_ROOT/Directory/shell 
2. New item: Menu item name
3. New sub item: command
4. Set value: "absolute path of executable application" "%1"

## right-click at background of folder
1. Location: HKEY_CLASSES_ROOT/Directory/Background/shell
2. New item: Menu item name
3. New sub item: command
4. Set value: "absolute path of executable application" "%v."

## backup
- file
  - vscode: "D:\vscode\Code.exe" "%1"
- background of folder
  - git-bash: "D:\git\git-bash.exe"
  - git-gui: "D:\git\cmd\git-gui.exe"
  - vscode: "D:\vscode\Code.exe" "%v."