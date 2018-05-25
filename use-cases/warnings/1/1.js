// uncomment this to get a useful warning
//var Promise = require('bluebird'); 

getInitializedStat().then(() => {
  getUsers(); // note this is missing a return
}).then(users => {
  res.json(users);
});

