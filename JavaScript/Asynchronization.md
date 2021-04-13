# Asynchronization

## 1. Promise

```javascript
// define
new Promise((resolve, reject) => {
    // callback then() 
    resolve();
    // callback catch()
    reject();
});

//usage
promiseInstance()
    .then(callback)
    .catch(callback)
    .finally(callback); // always do

// call in chain if resolve return a promise
promiseInstance()
    .then(promise)
    .then(promise)
    // ...
    // only one catch. either promise reject will stop chain and callback
    .catch(callback)
    .finally(callback); 
```

- Promise.all(): all promise resolve then resolve
- Promise.allSettled(): return all promise result
- Promise.any(): one promise resolve then resolve (only reject when all promise reject)
- Promise.race(): return first resolve or reject promise
- Promise.resolve(): return a promise always resolve (with reason)
- Promise.reject(): return a promise always reject (with reason)

## 2. async/await
```javascript
// async must before function
async function asyncFunction() {
    // promise must after await
    await sept1();
    // multi await is available 
    await sept2();
    // ...
}
```
