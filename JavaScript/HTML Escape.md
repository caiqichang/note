# HTML Escape

- For single quote `&#39;` is valid in both HTML5 and HTML4, but `&apos;` is only in HTML5.
- Must escape `&` first, because other escape will generate `&`.

```javascript
/**
 * Escape HTML to prevent XSS.
 * @param content content that append to HTML
 * @returns Safe HTML
 */
const escape = function (content) {
    if (typeof content !== 'string') return content;
    return content.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
};
```