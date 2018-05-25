### Use Case #unhandled-rejections-1

Name: Unhandled Rejections: Our current heuristic can be problematic with async functions

Eula is writing regular code with an `async` function waiting for multiple things and is getting a weird warning.

### What happens

```js
async function foo() {
    var p1 = getSomeApi();
    var p2 = getSomeOther();
    await p1;
    // if p2 rejects - it will emit an unhandled rejection
    await p2; // although it is awaited here
}
```

Here, she is getting an unhandled rejection - she can write the code with a `Promise.all` that doesn't have that problem.

### Why it happens

Because unhandled rejection detection detects promises that reject without a handler attached within a microtick.

### What can we maybe do better

Ideally, I _think_ we want to emit an  `unhandledRejection` here (since if p1 rejects the error for p2 _is_ ignored). However, we should consider being less confusing for users about it.

For example a warning for creating multiple promises and then only awaiting a subset of them - if that works.