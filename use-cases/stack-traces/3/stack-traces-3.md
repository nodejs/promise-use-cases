### Use Case #stack-traces-3

Name: Want to configure when to "break into debugger" or "take core dump" on rejections easily.

Franchesca is trying to debug an issue in a Node.js application where a promise rejects somewhere and causes an `unhandledRejection`. This is a unique state in Franchesca's app and she would like to detect it by taking a core dump when promises reject. 

### What happens

The `unhandledRejection` hook only emits after a microtick has passed so it is impossible to detect it.

### Why it happens

Because otherwise we would detect false positive unhandled rejections way mor often.

### What can we maybe do better

Node.js could expose an `async_hook` for when a promise rejects optionally.