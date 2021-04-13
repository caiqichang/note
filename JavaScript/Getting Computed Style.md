# Getting Computed Style

- api
```javascript
// element -- dom element to compute
// pseudo -- e.g. '::before', null if not
window.getComputedStyle(element, pseudo);
```

- demo to get value of `--DEFINE-COLOR`
```javascript
let div = document.createElement('div');
div.style.color = 'var(--DEFINE-COLOR)';
document.body.prepend(div);
let result = getComputedStyle(div).getPropertyValue('color');
document.body.removeChild(div);
return result;
```