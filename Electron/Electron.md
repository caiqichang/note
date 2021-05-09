# Electron

## Initialization
```
npm init
```
```
npm install --save-dev electron
```

## Structure and File
```
+-- project
| +-- src
| | +-- view
| | | `-- index.html
| | `-- main.js
| `-- package.json
```

package.json
```json
{
  "name": "",
  "version": "1.0.0",
  "scripts": {
    "start": "electron ."
  },
  "main": "src/main.js",
  "devDependencies": {
    "electron": ""
  }
}
```

main.js
```js
const {app, BrowserWindow} = require('electron');

app.whenReady().then(() => {
    const win = new BrowserWindow({
      // enable ipc
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      },
    });
    win.loadFile('src/view/index.html');
});
```

## Distribution
1. Download Electron's [prebuilt binaries](https://github.com/electron/electron) .
2. Copy `src` and `package.json` to:
    - MacOS: electron/Electron.app/Contents/Resources/app/
    - Windows or Linux: electron/resources/app
3. Use [rcedit](https://github.com/electron/rcedit) to change `electron.exe` . (optional)
4. Rename `electron.exe` . (optional)