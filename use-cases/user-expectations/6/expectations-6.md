### Use Case #6

Name: Synchronous exception in Promise constructor always rejects even if promise is already resolved.

Brandy is writing code with Promises. She writes the following program, and is surprised/confused by not seeing the `"resolved!"` message in the console. That confusion causes her to worry that the Promise constructor is not even running, even though it seems like `showSuccess()` is being called.

```js
var OK = true;

var p = new Promise(function c(resolve,reject){
   if (OK) {
      resolve("Good to go!");
      cosnole.log("resolved!");   // console misspelled here
   }
   else {   
      reject("Oops!");
      console.log("rejected.");
   }
});

p.then( showSuccess, showError );
// ..nothing printed to console :(
```

### What happens

The promise is already fulfilled (with `resolve(..)`), so the exception that then happens from `cosnole.log(..)` being misspelled is silently swallowed.

### Why it happens

Promises can only be resolved to a fulfillment or rejection, and once resolved, cannot be changed. This normally makes sense, but in this specific case of an accidental exception that occurs synchronously subsequent to the otherwise resolution (fulfillment or rejection), the user never expects the promise machinery to just suppress/hide that exception.

### What can we maybe do better

This could be seen as a case for a warning. But that warning would likely be confusing to track down, because it's likely going to talk about the promise trying to be rejected after it's already resolved. This code doesn't look like it matches that pattern, since there's a clear `if-else` that either fulfills or rejects. It may be confusing for the user to connect-the-dots that the excess rejection is actually an unexpected JS exception.

In this case, a synchronous exception is different from if the user had mistakenly called `reject(..)`. It's not a mistake of the usage of the API, but (arguably) a more serious exception of writing broken JS. Being more serious, it calls for this case to be handled differently from handling for simply using the Promise mechanism incorrectly.

By virtue of how the promise is constructed (with a synchronous resolution and `if..else`), the user is expecting either the fulfillment or rejection paths to cover all possible outcomes. The user is most likely any exception to result in the promise having been rejected, with the exception as its reason. As such, the most appropriate place to report the exception is in the promise rejection path. Thus, the synchronous exception needs to override the prior synchronous resolution.

Because the suggested change would be breaking backwards compatibility with current promises, the user should be able to opt-in to the different behavior **prior to the construction**. For example, they could set a flag to turn on a sort of "strict mode" for the Promise construction.

----

Additional Notes:

1. The suggested behavior for the constructor is implemented in this [`BetterPromise` experiment](https://gist.github.com/getify/1173cac45d15fc4ff0a880f32fd598ab).

2. This notion of suggested overriding is not without precedent in JS, btw. The `finally {..}` clause in a function is notably able to override a previous synchronous `return` value from that same function.

   In fact, one could think of this suggested behavior kind of like sugaring for this:

   ```js
   var p = new Promise(function c(resolve,reject){
      var _fulfillment;
      var _rejection;
      
      try {
         if (OK) {
            _fulfillment = "Good to go!";
            cosnole.log("resolved!");   // console misspelled here
         }
         else {
            _rejection = "Oops!";
            console.log("rejected.");
         }
      }
      catch (err) {
         _rejection = err;
      }
      finally {
         if (_rejection) reject(_rejection);
         else if (_fulfillment) resolve(_fulfillment);
      }
   });
   ```
