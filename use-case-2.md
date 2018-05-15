## Use Case

Tal is writing an instrumentation library that helps users find errors with promises. Tal writes code that helps detect errors in promise usage and helps David find errors in his promise constructor usage.

### Demonstrating Code

David gets an error for the following incorrect and dangerous promise code:

```js
new Promise((resolve, reject) => {
    return somePromise().then(resolve, reject);
});
```


### What happens now?

It is impossible to write such instrumentation

### What would provide better user experience?

Hooks that would enable writing such instrumentation possible
