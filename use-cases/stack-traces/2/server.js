const { someAsyncFn } = require('./model.js');

// const app = require('express')(); 
// app.get('./', (req, res) => )...
(async () => {
  let result = await someAsyncFn(5);
  //res.json(result);
})();


/** 
 * Errors with
 * node server.js 
(node:31824) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error
(node:31824) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
 */

//process.on('unhandledRejection', e => { throw e; });

/* /Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/6/server.js:18
process.on('unhandledRejection', e => { throw e; });
                                        ^

Error
    at c (/Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/6/model.js:11:9)
    at <anonymous>

 */