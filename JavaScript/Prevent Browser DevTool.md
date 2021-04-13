# Prevent Browser DevTool

```javascript
/**
 * Stop application if user open the browser devtool.
 * @param timeout milliseconds per check (default 500)
 */
export default (timeout) => {
    let div = document.createElement('div');
    // define getter of div.id
    Object.defineProperty(div, 'id', {
        get: () => {
            // Debugger will be removed when Webpack packaging, 
            // use eval() instead of debugger directly.
            eval('debugger;');
        }
    });
    // Polling to print div.id to console.
    // If user open the browser devtool, page will stop and be debugging.
    setInterval(() => {
        console.log(div.id);
        console.clear();
    }, timeout || 500);
}
```