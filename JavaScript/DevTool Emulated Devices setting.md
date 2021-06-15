# DevTool Emulated Devices setting

- Get Data
```javascript
/**
 * Get device's properties for emulation.
 * @returns properties of device
 */
const getEmulatedDeviceProperties = function () {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRadio: window.devicePixelRatio,
        userAgent: window.navigator.userAgent,
    };
};
```