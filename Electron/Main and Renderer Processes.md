# Main and Renderer Processes

## Communication via IPC (Inter-Process Communication)
- Enable
```js
const win = new BrowserWindow({
    // enable
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },
});
```

- Main
```js
const {ipcMain} = require('electron');

ipcMain.on('ping-receiver', (event, arg) => {
    // ...
    event.reply('pong-receiver', 'pong');
});
```

- Renderer
```js
const {ipcRenderer} = require('electron');

ipcRenderer.on('pong-receiver', (event, arg) => {
    // ...
});

ipcRenderer.send('ping-receiver', 'ping');
```