var mongoose =  require('mongoose');
var config = require('../config');

// db connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbpath, function(err, db) {
  if(!err) {
    console.log("Connected to mongodb at port 27017");
  } else {
    console.log(err);
  }
});

module.exports = mongoose;
