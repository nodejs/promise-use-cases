## Use Case
We have a large number of URLs we need to hit, and are risking rate limitions by various services we need to query and/or poll.
We wish to make these calls in parallel, but at the same time, not attempt to fire 10,000 requests at the same time.

### Demonstrating Code
```javascript
async function magic() {
  const list = await getListFromServer(); // list.length > 20000
  const results = await Promise.all(list.map(queryEndpoint)); // explodes after a while because requests start to fail with rate limitation
  return results;
}
```

### What happens now?
The function rejects because at some point, we reach the rate limitation of N requests per second and are blocked.

### What would provide better user experience?
Provide a concurrency option or wrapper to `Promise.all()` which would allow you to specify how many conceptual "threads" are allowed to run at the same time.

Something like the following perhaps

```javascript
const results = await Promise.concurrently(list, queryEndpoint, {concurrency: 5}); // only 5 queryEndpoint calls may run at any one time.
```
