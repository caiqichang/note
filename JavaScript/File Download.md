# File Download

## GET Method Only
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
downloadTarget.src = DOWNLOAD_URL + '?query=' + encodeURIComponent(JSON.stringify(PARAMETERS));
```

## Others
- Fetch
```javascript
fetch(URL, {
    method: METHOD,
    headers: HEADERS,
    body: BODY,
}).then(response => {
    if (response.status === 200) {
        var filename = 'DEFAULT_FILE_NAME';
        var contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
            let group = contentDisposition.match(/attachment; filename="(.+)"/);
            if (group != null && group.length > 1) filename = decodeURIComponent(escape(group[1]));
        }

        response.blob().then(blob => {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            document.body.append(a);
            a.click();
            a.remove();
        });
    }else {
        // fail
    }
});
```

- XMLHttpRequest
```javascript
let xhr = new XMLHttpRequest();
xhr.responseType = 'blob';
xhr.onload = () => {
    if (xhr.status === 200) {
        var filename = 'DEFAULT_FILE_NAME';
        var contentDisposition = xhr.getResponseHeader('Content-Disposition');
        if (contentDisposition) {
            let group = contentDisposition.match(/attachment; filename="(.+)"/);
            if (group != null && group.length > 1) filename = decodeURIComponent(escape(group[1]));
        }

        let a = document.createElement('a');
        a.href = URL.createObjectURL(xhr.response);
        a.download = filename;
        document.body.append(a);
        a.click();
        a.remove();
    }else {
        // fail
    }
};
xhr.open(METHOD, URL);
xhr.setRequestHeader(HEADER);
xhr.send(BODY);
```

- jQuery
```javascript
$.ajax({
    url: URL,
    method: METHOD,
    headers: HEADERS,
    data: BODY,
    dataType: 'binary', // required
    // response type
    xhrFields: {
        responseType: 'blob',
    },
    // or
    // xhr() {
    //     let xhr = new XMLHttpRequest();
    //     xhr.repsonseType = 'blob';
    //     return xhr;
    // },
    success(data, textStatus, jqXHR) {
        var filename = 'DEFAULT_FILE_NAME';
        var contentDisposition = jqXHR.getResponseHeader('Content-Disposition');
        if (contentDisposition) {
            let group = contentDisposition.match(/attachment; filename="(.+)"/);
            if (group != null && group.length > 1) filename = decodeURIComponent(escape(group[1]));
        }

        let a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = filename;
        document.body.append(a);
        a.click();
        a.remove();
    },
    error(err) {
        // fail
    },
});
```