### Use Case #stack-traces-1

Name: Stack trace missing when writing promise code and not using the inspector for example in Mocha

Lenita is writing tests for her async functions - she is running the tests in Mocha.

```js

// main file.
module.exports.someAsyncFn = async function someAsyncFn(ms) {
  await require('util').promisify(setTimeout)(ms);
  b();
};
async function b() {
  c();
}
async function c() {
  throw new Error(); // in practice - a real error case given input
}

// test file
it('behaves in a predictable way', async () => {
  let res = await someAsyncFn(5); // this throws an exception
  expect(res).to.equal(5); 
});
```

### What happens

Lenita geta a less than helpful stack trace from the test tool not containing async stack traces.

This is unlike synchronous code. Note that this is similar to callback behavior mostly.

### Why it happens

Because async stack traces are currently not exposed outside of the inspector.

### What can we maybe do better

Node could expose async stack traces somehow to achieve parity with promise libraries which would make users' lives easieer