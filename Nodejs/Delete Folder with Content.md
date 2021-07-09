# Delete Folder with Content

```javascript
const fs = require('fs');

fs.rm(TARGET, {
    recursive: true,
    force: true,
});

/**
 * @depercaded
 */
fs.rmdirSync(TARGET, {
    recursive: true,
});
```

