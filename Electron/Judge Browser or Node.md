# Judge Browser or Node

This way is for `HTML` page to judge that if itself is in `Browser` or `Node` Environment.

- Browser
```javascript
let isBrowser = (new Function('try {return this === window;} catch(e) {return false;}'))();

if (!isBrowser) {
    eval(`
        // do something about Electron ...
    `);
}else {
    // ...
}
```

- Node
```javascript
let isNode = (new Function('try {return this === global;} catch(e) {return false;}'))();

if (isNode) {
    eval(`
        // do something about Electron ...
    `);
}else {
    // ,,,
}
```
