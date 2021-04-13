# 获取CSS计算样式

```javascript
// element -- 需要获取的样式所在dom元素
// pseudo -- 指定为元素 例如：'::before'，普通元素省略该参数或用null
window.getComputedStyle(element, pseudo);
```

示例：获取CSS定义的--DEFINE-COLOR
```javascript
let div = document.createElement('div');
div.style.color = 'var(--DEFINE-COLOR)';
document.body.prepend(div);
let result = getComputedStyle(div).getPropertyValue('color');
document.body.removeChild(div);
return result;
```