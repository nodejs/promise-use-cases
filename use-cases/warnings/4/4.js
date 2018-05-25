;(new Promise(() => {})).then(() => console.log('a executed'))
;(Promise.resolve('x')).then(() => console.log('b executed'))

// outputs
// b executed

// a executed is never printed, user doesn't know why.