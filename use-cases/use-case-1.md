## Use Case

Eve is using Redis as a caching layer and PostgreSQL as a database. Eve would like to hit both the cache and the database whenever a user makes a request. Eve is using async await.

Eve does not get a bunch of `unhandled promise rejection` and the code works as expected

### Demonstrating Code


```js
async function foo() {
    const p = getDataFromRedis();
    const p2 = getDataFromPostgreSQL();
    const redisResult = await p;
    if (redisResult.isUpToDate) {
      return redisResult.value;
    }
    const postgreResult = await p2;
}

```

### What happens now?

Because no code observes the resolution state of p2 until p has resolves an `unhandledRejection` event is emitted and an error is printed to the console.

### What would provide better user experience?

Not giving a false negative error - for example by detecting we're in an async function and there is another promise awaited.
