# falsy and truthy

## falsy
假值 Boolean环境下转换为false，即Boolean(VALUE) = false

* false
* 0, -0, 0n, -0n, 0.0, -0.0
* '', "", ``
* undefined
* null
* NaN

任意值与布尔值比较时先转换为Number，调用Number(VALUE)
```javascript
Number(false) = 0;
Number(false) = 1;
```

以下为不是假值：
* {} 
* []
```javascript
Number({}) = NaN;
Number([]) = 0; // 所以 [] == false 为true，但 if([]) 为true

// attention !!!
Number([undefined]); // 0
Number(new Array()); // 0
Number(new Array(0)); // 0
Number(new Array(1)); // 0
Number([0]); // 0
```

## truthy
除假值以外的为真值
