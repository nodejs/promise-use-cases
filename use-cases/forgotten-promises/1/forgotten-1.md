### Use Case #forgotten-1

Name: here is no easy way to address the promises "in a scope"

Talia is writing code with promises, the has written the following code within an express route

```js
app.post('/dev/apply', async (request, response) => {
    const { dev } = request.query;
    const application = await applyDevAsync(dev);
    response.json(application.problemIsSolved);
});
```

### What happens

`applyDevAsync` may never resolve and/or create promises of its own which never resolve and/or leak.

### Why it happens

Because that's life.

### What can we maybe do better

Provide a way to perhaps wrap an async function or an execution context so that it's easier to see what Promises were created within the context and their status is.