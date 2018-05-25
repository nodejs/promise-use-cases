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