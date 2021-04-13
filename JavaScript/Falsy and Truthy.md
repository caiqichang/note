# Falsy and Truthy

If Boolean(VALUE) === false then VALUE is Falsy else VALUE is Truthy.

Falsy:
- false
- 0, -0, 0n, -0n, 0.0, -0.0
- '', "", ``
- undefined
- null
- NaN

VALUE trans to Number (call Number(VALUE)) before compare to Boolean.
```javascript
Number(false) = 0;
Number(true) = 1;
```

Not Falsy: 
- {} 
- []
```javascript
Number({}) = NaN;
Number([]) = 0; // [] == false is true, but if([]) is true

// attention !!!
Number([undefined]); // 0
Number(new Array()); // 0
Number(new Array(0)); // 0
Number(new Array(1)); // 0
Number([0]); // 0
```
