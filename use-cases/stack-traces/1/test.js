const { someAsyncFn } = require('./main.js');

// test file
it('behaves in a predictable way', async () => {
  let res = await someAsyncFn(5); // this throws an exception
  expect(res).to.equal(5); 
});

/* actual output:

  1) behaves in a predictable way
(node:31392) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error
(node:31392) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

  0 passing (12ms)
  1 failing

  1) behaves in a predictable way:
     ReferenceError: expect is not defined
      at Context.it (test.js:6:3)
      at <anonymous>
*/