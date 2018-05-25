'use strict'

var all = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['a'], // <- recursive
  d: []
}

var cache = {}

function getDeep (key) {
  var promise = cache[key]
  if (promise) {
    return promise
  }
  console.log(`Examining ${key}`)
  promise = new Promise((resolve, reject) => {
    setImmediate(() => {
      Promise.all(all[key].map(getDeep)).then(resolve).catch(reject)
    })
  })
  cache[key] = promise
  return promise
}

getDeep('a').then(allDeps => {
  console.log(`All dependencies of 'a': ${allDeps}`)
}).catch(e => console.log(e.stack || e))

//
// This will output something like:
//
//   Examining a
//   Examining b
//   Examining c
//   Examining d
// Because at one point a waits on the result of a which means there
// is no background process for the promise left running: the nodejs app closes
//
