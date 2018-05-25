### Use Case #expectations-5

Name: Extracting resolution/rejection abilities from Promises is awkward and confusing.

Reference: https://github.com/nodejs/promise-use-cases/issues/13

Daniel has an existing component which cannot be easily warpped due to leaky abstraction 

```js
function deferred() {
   var resolve;
   var reject;
   var pr = new Promise(function(res,rej){
      resolve = res;
      reject = rej;
   });
   return { pr, resolve, reject };
}

async function doSomething() {
    const { pr, resolve, reject } = deferred();
    const godObject = GodObject.getPartialOperation(resolve);
    return await pr;
}
```

### What happens
This pattern is awkward to use and understand, and has some (albeit a few) legitimate cases.

### Why it happens
Because making senisble APIs is hard.

### What can we maybe do better
??
