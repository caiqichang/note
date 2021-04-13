# File Download

- A hidden iframe for download target.
```html
<iframe style="display: none;" id="downloadTarget"></iframe>
```

- Code
```javascript
let downloadTarget = document.querySelector('#downloadTarget')
if (downloadTarget instanceof Elmenet) {
    downloadTarget.addEventListener('load',  event => {
        if (event) {
            // if download fail, event will not null, and callback here
        }
    });
}

// start download
downloadTarget.src = DOWNLOAD_URL;
```
