### Use Case #1

Name: Can't implement userland features on top of native promises - such as cancellation, because of `async`/`await`

Kyle is writing a userland solution for cancellation of asynchronous actions and is forced to use generators rather than async functions or to use transpilation techniques in order to get cancellation semantics to work with Node.js

### What happens

Kyle is using generators since they expose a `.return` function.

### Why it happens?

Because there are no hooks for instrumenting async functions so Kyle can't use them

### What can we maybe do better

Node.js should consider providing hooks for users to experiment with cancellation semantics. 