### Use Case #expectations-1

Name: Promisified or Promisifiable core

Sharon is consuming a Promise returning library in Node.js, he wrote the following code:

```js
function getModule() {
    return new Promise((resolve, reject) => {
        System.import('./someModule').then(mod => mod.doThing).then(resolve).catch(reject)
    });
}
```
### What happens

This code works, but is wastful and unreadable.

### Why it happens

Sharon should have not used the Promise constructor here, he should have return the Promise returned from `System.import(...).then(...)`

### What can we maybe do better

Show a clear warning when `.then()` is called within a Promise constructor.