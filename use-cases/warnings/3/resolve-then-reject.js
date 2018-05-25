function promisifyThing(thing) {
    return new Promise((resolve, reject) => {
        if (thing.isAThing) { resolve(thing); }
        if (thing.hasErrors) { reject(thing.accumulatedErrors); } // swallowed if thing.isAThing is truthy.
        if (thing.shouldDoAThing) { thing.doAThing((err, value) => err ? reject(err): resolve(value)); }
    })
}