var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// club create post
router.post('/division-new', function(req, res) {
  // create new club
  var division = new dbmodels.division(req.body);
  division.save(function(err, division) {
    if (err) {
      console.log('errors', err);
    }
    res.send('division created');
  });
});

module.exports = router;
