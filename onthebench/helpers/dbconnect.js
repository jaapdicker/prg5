var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

// db connection
mongoClient.connect("mongodb://localhost:27017/onthebench", function(err, db) {
  if(!err) {
    console.log("Connected to mongodb at port 27017");
  } else {
    console.log(err);
  }
})

module.exports = mongoClient;
