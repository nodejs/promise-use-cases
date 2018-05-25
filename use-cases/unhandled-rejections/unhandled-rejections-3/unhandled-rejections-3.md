### Use Case #unhandled-rejections-3

Name: People don't trust automatic unhandled rejection detection and add `.catch(error => console.log('error'))`

Kyle is writing code using promises cahining and/or `async/await`. He adds catch handlers where he logs the errors:


### What happens

Currently, they are writing code like:

```js
async function foo() {
  try {
    await someAsyncFn();
  } catch (e) {
    console.error(e);
  }
}

Or:

```js
someAsyncFn().catch(e => console.error(e));
```

### Why it happens

Because we haven't gained a level of trust from the community for our default debugging tools. Because people don't know that we log that or because we've only been logging the full error pretty recently.

### What can we maybe do better

Provide a better experience with the `unhandledRejection` and error hooks or communicate that users do not need to add these handlers. In addition they also can mess up the flow control if they are not very used.