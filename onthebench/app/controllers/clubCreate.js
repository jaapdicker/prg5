var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// club create post
router.post('/club/new', function(req, res) {
  // create new club
  var club = new dbmodels.club(req.body);
  club.save(function(err, club) {
    if (err) {
      console.log('errors', err);
    }
    res.send('club created');
  });
});

module.exports = router;
