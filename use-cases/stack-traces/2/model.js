module.exports.someAsyncFn = async function someAsyncFn(ms) {
  await require('util').promisify(setTimeout)(ms);
  b();
};
async function b() {
  await require('util').promisify(setTimeout)(100);
  c();
}
async function c() {
  await require('util').promisify(setTimeout)(100);
  throw new Error(); // in practice - a real error case given input
}