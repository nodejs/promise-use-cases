### Use Case #2

Name: There is no standard way in promisified or promise-based Node.js APIs for controlling the operation - such as DOM's SignalController (/AbortController).

Marci is writing async code in Node.js and would like to abort a request. She is frustrated that every library exposing a Promise API is exposing a different method of cancellation and that none work with async functions.

### What happens

Marci is using a library exporting cancellable bluebird promises, a library using cancellation tokens and a library using its own `.cancel` method on promises.

She has to write convoluted non-trivial code to make them work together.

### Why it happens?

Because there are no hooks for instrumenting async functions so Marci can't use them with cancellation.

### What can we maybe do better

Node.js should consider providing hooks for users to experiment with cancellation semantics and provide TC39 feedback abotu them.