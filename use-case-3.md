## Use Case

Eve is using async generators, Eve is a careful programmer and using `async await` with `try...catch..` but still getting Unhandled promise rejection

### Demonstrating Code


```js
async function* iterateOnDatabaseResult() {
    const dataA = fetchFromPromise();
    const dataB = fetchFromBPromise(); // it will reject 

    for (const p of [dataA, dataB]) {
        yield await p;
    }
}

async function getAllData() {
    try{
        for await (const data of iterateOnDatabaseResult()) {
            await handleDataThatWillReject(data);
        }
    }catch(err){
        // catch but still getting error Unhandled promise rejection
    }
}

```

### What happens now?

The async generator is no longer reachable, and can't be invalidated with all the promises that wasn't yielded or\and awaited inside it

### What would provide better user experience?

Not giving a false negative error - for example by detecting we're in an async generator function that is no longer usable
