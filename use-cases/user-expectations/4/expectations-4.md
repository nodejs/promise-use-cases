### Use Case #expectations-4

Name: Promises in `.forEach`

Reference: https://stackoverflow.com/q/37576685/871050

Zoe wrote the following function

```js
import fs from 'fs-promise'

async function printFiles () {
  const files = await getFilePaths() // Assume this works fine

  files.forEach(async (file) => {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  })
}

printFiles()
```

### What happens
Zoe can't wait on the results of all of the files, she also can't read the files in sequence with this form.

### Why it happens
- Waiting on the results of all the files requires using `Promise.all(files.map(...))`, which is a bit counter-intuitive.
- Running the files in a sequence while still maintaining the higher-order-function form requires using something like
  ```js
  files.reduce((promise, file) => promise.then(() => fs.readFile(file, 'utf8')), Promise.resolve())
  ```
  Which is even more counter-intuitive.

### What can we maybe do better
- Perhaps provide an official documentation/tutorial on the matter. 
- Warn when promises are created within async functions (forEach calling the internal `async` function) but are not returned or awaited.