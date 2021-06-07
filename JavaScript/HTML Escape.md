# HTML Escape

- For single quote `&#39;` is valid in both HTML5 and HTML4, but `&apos;` is only in HTML5.

```javascript
function escapeHtml(src) {
    if (typeof src !== 'string') return src;
    return src.replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
}
```