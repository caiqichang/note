# DevTool Emulated Devices setting

- Get Data
```javascript
window.alert(JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRadio: window.devicePixelRatio,
    userAgent: window.navigator.userAgent,
}));
```