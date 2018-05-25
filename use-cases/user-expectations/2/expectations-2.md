### Use Case #expectations-2

Name: General promisification

Aizik is consuming an awkward callback based API, and wants to use Promises. Aizik is smart, be like Aizik.

```js
function doSomethingAndCallAwkwardCallback(cb) {
    // do some things
    cb([results], {error: potentialError});
}

function promisifyAwkwardCallbackAction() {
    return new Promise((resolve, reject) => {
        doSomethingAndCallAwkwardCallback(([results], {error}) => {
            if (error) { return reject(error) };
            resolve(results);
        });
    });
}
```
### What happens
Aizik had to use the Promise constructor to promisify the function

### Why it happens
Sometimes, 3rd party APIs can be awkward and not nice, or be tailored to a specific usecase.

### What can we maybe do better