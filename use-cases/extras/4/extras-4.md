### Use case #4

Name: Users expect(ed) to be able to quit promise chains early -  this is the most `+1`d issue in Bluebird ever https://github.com/petkaantonov/bluebird/issues/581

Malinda is using promises but she is unable to quit promise chains early.

### What happens?

There is no way to "short circuit promises"

### Why it happens?

Language semantics and the lack of cancellation of promises or async functions.

### What can we maybe do better?

Expose a hook (similarly to extras-3)