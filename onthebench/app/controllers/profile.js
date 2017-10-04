var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/profile');

// get profile page
router.get('/profile', function (req, res) {
  res.render('profile', model.data);
});

// post profile update
router.post('/profile', function (req, res) {
  var userId = req.cookies['session'].user.id;

  // find only user and update (findOneAndUpdate not possible with password hashing)
  var updating = function (err, data) {
    if(err) {
      res.render('profile', model.data);
      return false;
    }
    res.render('profile', model.data);
  }

  model.update(dbmodels.user, userId, req.body, updating);
});

module.exports = router;
