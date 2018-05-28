# Solutions Exploration
The purpose of this document is to explore possible hooks and/or APIs that may be used to resolve at least some of the use-cases presented in the "extras" section of this repo.

Suggestions will be listed and discussed in an arbitrary order and may contain overlaps in functionality as well as in the problems they intend to solve.

## Suggestion I - Async Functions Controller
**Idea:** Give the invoker of an async function (some) ability to control its execution in a backward compatible way.

### Example
The following code should print out `Waited 50 ms`:
```js
// Does not exist:
const {getController} = require('async_hooks');

const setTimeoutPromise = require('util').promisify(setTimeout);

async function wait(ms) {
  const before = Date.now();

  try {
    await setTimeoutPromise(ms);
  }
  finally {
    console.log("Waited", Date.now() - before, 'ms');
  }
}

let p = wait(100);
const controller = getController(p);

setTimeoutPromise(50)
  .then(() => controller.return());
```
Since the `getController` API only works on promises returned from async function invocations, the invoker can have full control over who gets to abort the operation.
This can easily be done in a generic way:
```js
// Naively assume it is indeed an async function:
function enhance(someAsyncFunction) {
  return (...args) => {
    const p = someAsyncFunction(...args);
    const controller = getController(p);

    return {
      // If aborted, promise will be fulfilled with an undefined value - this can be modified in various ways:
      promise: Promise.resolve(p),
      abort: () => controller.return(),
    };
  }
}

const {
  // Can be safely passed to anyone:
  promise,

  // Only the invoker is able to abort:
  abort,
} = enhance(wait)(1000);

```

## Suggestion II - Promise Interceptors
**Idea:** Provide new promise hooks that not only _inform_ of promise creations and resolutions but can also _affect_ the outcome.

[This reference implementation](https://gist.github.com/itaysabato/f78394793ae265c7895e862c2b2bd215) demonstrates a possible implementation of a "Bluebird-style" cancellation API on top of native promises via a promise _interception_ hooks API that I drafted therein.

### Problems
The interception API and implementation given above has a few addressable shortcomings:

1. Cancellation does not work in conjunction with async functions / generators.
This is because it only keeps track of direct parent-child promise relationships.
For the same reason, cancellations do not propagate to "followed" promises, e.g.
```js
const followed = Promise.resolve();
const parent = Promise.resolve();
const child = parent.then(() => followed);
```
This can be solved by adding an additional hook such as `interceptFollow(promise, followed)` to keep track of these cases as well.

2. Cancel-aware `finally` must be explicit. This is because the hooks do not provide knowledge of the _kind_ of relationship between a parent and its child nor the type of resolution.
If we add this information to the promise init hook (e.g. `interceptPromiseInit(promise, parent, kind, next)` where `kind` could be `onFulfilled`, `onRejected`, `onFinally`, etc.)
then we could manage "native" `finally`s correctly.

3. Even if the above two issues are resolved as suggested, "static" finally statements in async functions or generators are not guaranteed to be tracked (depending on internal implementation).
E.g. the following code may or may not print something:
```js
const setTimeoutPromise = require('util').promisify(setTimeout);

async function finallySay(something) {
  try {
    await setTimeoutPromise(0);
  }
  finally {
    console.log(something);
  }
}

cancel(finallySay("Cancelled"))
```

## Suggestion III - Informative Promise Hooks + Async Functions Controller
**Idea:** Combine the above two approaches such that async functions and generators are cancelled via `.return()` and relationships between promises are tracked via promise hooks.

### Details
**_TBD_**

## Suggestion IV - Benji's Context Idea
**Idea:** **_TBD_**

### Details
**_TBD_**
