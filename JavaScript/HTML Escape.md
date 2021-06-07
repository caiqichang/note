# HTML Escape

- For single quote `&#39;` is valid in both HTML5 and HTML4, but `&apos;` is only in HTML5.
- Must escape `&` first, because other escape will generate `&`.

```javascript
function escapeHtml(html) {
    if (typeof html !== 'string') return html;
    return html.replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&#39;');
}
```