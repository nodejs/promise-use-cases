
Summary of repo issues based on meeting between @benjamingr and @MadaraUchiha

Methodology:
 - Solicit feedback from community
 - Go over issue trackers of promise libraries (bluebird, q, etc) and gather common issues
 - Go over nodejs/help promises questions.
 - GitHub code search for negative term + promises to see what annoys people.
    - Apparently, people <3 promises
 - Go over most popular questions in StackOverflow and see what people find hard
 - Sit together (me and Dor) and think about it.
 - Sit with Itai to hear about his cancellation use case. 

 - Warnings:
  - Forgetting to return promises from `then` handlers or `async` functions (when not awaiting). (use case #1)
  - Forgetting to `await` promises in `async` functions. 
  - Promise constructor rejecting and then resolving or vice versa (or with sync errors).
  - Promises in recursive assimilation never resolve creating a confusing case for users.

 - Stack Traces:
  - Stack trace missing when writing promise code and not using the inspector for example in Mocha (use case #5)
  - Async stack traces cannot be controlled by the user - can't log errors in production (use case #6);
  - Want to configure when to "break into debugger" or "take core dump" on rejections easily. (use case #7)

 - Unhandled Rejections:
  - Our current heuristic can be problematic with async functions (use case #8)
  - No throw on GC yet (Reuben is working on it) (use case #9)
  - People don't trust automatic unhandled rejection detection and add `.catch(error => console.log('error'))`

 - Forgotten promises:
  - If I have a promise that never resolves - there is no easy way to know about it.
  - There is no easy way to address the promises "in a scope" - for example to gather tracing information about all promises in a given request transaction or whatnot. C# synchronization context.

 - Testing:
  - Fake timers break with promises because there is no way to "pump" the event loop.
    - Common request from timer users - all of Sinon.JS and Jest 
      - people currently transpiling their async/await code in order to test it - which isn't great.
  - No way to control where an async function is and test different synchronization possibilities easily
    - For example people request being able to reproduce race conditions.

 - Performance:
  - Users are still using Bluebird for the heaviest promise loads - especially libraries. We need to convince users that native promises are fast enough. Note this might be due to a better debugging story or `promisifyAll`.
  - Async iterators don't have a great performance story yet which might hinder further adoption - although it appears that not that many people are using them so it's hard to draw conclusions.   

 - User Expectations:
  - We don't have a fully promisified or promisifiable core yet - the most common error people have in Stack Overflow is when they wrap promises in other promises needlessly (explicit construction). Users still need to write `new Promise` in some cases.
  - The second most common problem is when users need to convert APIs to promises. This is somewhat addressed by `util.promisify` but Node.js doesn't have a great promise API story yet. Great progress by @jasnell and @addaleax.
  - We don't have documentation of how the promise queue is integrated into Node.js
  - Users expect to be able to use `async/await` with things like `.forEach` but they can't - can we communicate it better? (with warnings for no returned promises).
  - Some people transpiling to JavaScript from other languages have reported a hard time with meaningful stack traces.
  


 - Extras:
  - Can't implement userland features on top of native promises - such as cancellation, because of async/await
  - No way to prototype and experiment with proposals that do this in Node.js - we might want to expose the capability under a flag. 
  - Users don't agree about how cancellation should look like - need to provide a platform way for users to experiment with it so that the TC can weigh alternatives and solutions can emerge from the community.
  - There is no standard way in promisified or promise-based Node.js APIs for controlling the operation - such as DOM's SignalController (/AbortController). 
  - Users have asked for a way to "unsubscribe" promise listeners ("unthen") - Kyle Simpson opened an issue about this
  - Users expect(ed) to be able to quit promise chains early -  this is the most `+1`d issue in Bluebird ever https://github.com/petkaantonov/bluebird/issues/581
  - We still don't have a great promises postmortem analysis story. Note that in the 3+ years we've had promises in Node.js literally not a single user complained about this in Node.js or the bluebird/q/when/rsvp tracker as far as I know. It is still important to some stakeholders.
  