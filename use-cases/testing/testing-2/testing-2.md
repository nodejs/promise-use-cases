### Use Case #testing-2

Name: No way to control where an async function is and test different synchronization possibilities easily - For example people request being able to reproduce race conditions.

Albert is writing promise based code and is trying to write his own debugging instrumentation. For this he would like to control when each `await` executes and how much to defer.

### What happens

He cannot hook on `await`s and is unable to write his instrumentation tool to simulate different timings easily.

### Why it happens

Because of language semantics and the lack of a hook

### What can we maybe do better

We should provide an escape hatch for mocking and instrumentation so users won't have to transpile their code to userland modules in order to test it. Currently users transpile to bluebird and `setScheduler`.