### Use Case #unhandled-rejections-2

Name: No throw on GC yet (Reuben is working on it)

Kylie is writing Node.js code, she does not want to exit the code for every `unhandledRejection` since there are false positives (which is why we have `rejectionHandled`). 


### What happens

Currently, she is stuck between either accepting the false positives or not being sure if she's leaving Node.js in an indeterminate state. 

### Why it happens

Because we don't have an ability to detect "real" promise unhandled rejections (effectively the halting problem).

### What can we maybe do better

We could detect cases where we can prove a rejection would not be handled and give users a hook so they can exit the process for it.

Initial work at https://github.com/nodejs/node/pull/20097 by @BridgeAR pre: @Fishrock123 and @addaleax

