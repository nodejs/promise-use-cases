const someApi = () => require('util').promisify(setTimeout)(100);
const someOtherApi = () => Promise.reject(Error());
const handleError = (e) => console.error('Error!', e);

async function foo() {
  const p1 = someApi();
  const p2 = someOtherApi();
  await p1;
  // if p2 rejects - it will emit an unhandled rejection
  try {
    await p2; // although it is awaited here
  } catch (e) { handleError(e); } 
}

foo();