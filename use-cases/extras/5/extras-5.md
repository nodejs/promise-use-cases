### Use case #5

Name: We still don't have a great promises postmortem analysis story.

Lindi is using core dumps to debug their code when an uncaught exception occurs.


### What happens?

Lindi is unable to use promises for this because unhandled rejections only happen "too late" and a lot of the information she is used to using with callbacks is missing.

### Why it happens?

Because of the nature of promises and the fact a `catch` handler can be attached at a later point.

### What should we maybe do better?

There was a lot of interesting work done by @addaleax on this.

Note that in the 3+ years we've had promises in Node.js literally not a single user complained about this in Node.js or the bluebird/q/when/rsvp tracker as far as I know. 

It is still important to some stakeholders and worth discussing.
  