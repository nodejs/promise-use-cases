const delay = require('util').promisify(setTimeout);

const someAsyncFn = async () => await b();
const b = async () => {
  await delay(10);
  await c();
}
const c = async () => {
  await delay(10);
  await d();
}
const d = async () => { throw new Error('Error!'); };


someAsyncFn(); 

/** 
 * logs with the default handler:
 * ~/Documents/OpenSource/promise-use-cases/use-cases/10 [master] $ ../../../node/out/Release/node code.js 
(node:32995) UnhandledPromiseRejectionWarning: Error: Error!
    at d (/Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/10/code.js:12:31)
    at c (/Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/10/code.js:10:9)
(node:32995) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
(node:32995) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
 */


// with .catch(e => console.error(e));
/** 
 * ~/Documents/OpenSource/promise-use-cases/use-cases/10 [master] $ ../../../node/out/Release/node code.js 
Error: Error!
    at d (/Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/10/code.js:12:31)
    at c (/Users/benjamin/Documents/OpenSource/promise-use-cases/use-cases/10/code.js:10:9)
 */
