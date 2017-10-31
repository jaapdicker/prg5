var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./dbmodels');
var data = require('./dbdata.js');
var _ = require('underscore');

router.post('/cleandatabase', function(req, res) {

  mongoose.connection.db.dropDatabase(function(err, result) {
    if (err) return false;
    console.log('database dropped');

    // add divisions
    _.each(data.divisions, function(division) {
      var docData = { name: division };
      var document = new models.division(docData);
      document.save(function(err, doc) {
        console.log('added: ' + doc);
      });
    });

    // add users
    for (var i = 0; i < data.users.firstNames.length; i++) {
      var docData = {
        firstName: data.users.firstNames[i],
        lastName: data.users.lastNames[i],
        position: data.users.position[i],
        email: data.users.firstNames[i] + '@intogolf.nl',
        password: 'test123',
      }
      var document = new models.user(docData);
      document.save(function(err, doc) {
        console.log('added: ' + doc);
      });
    }

    // add clubs
    for (var i = 0; i < data.clubs.name.length; i++) {
      var docData = {
        name: data.clubs.name[i],
        address: data.clubs.address[i],
        city: data.clubs.city[i],
        postal: data.clubs.postal[i]
      }
      var document = new models.club(docData);
      document.save(function(err, doc) {
        console.log('added: ' + doc);
      });
    }
  });
  res.send('process complete');
});

module.exports = router;
