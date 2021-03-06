var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/profile');
var _ = require('underscore');

// get profile page
router.get('/profile', function (req, res) {
  res.render('profile', req.session.data);
});

// post profile update
router.post('/profile', function (req, res) {
  var userId = req.session.data.profile._id;

  // find only user and update (findOneAndUpdate not possible with password hashing)
  var updating = function (err, data) {
    if(err) {
      res.render('profile', req.session.data);
      return false;
    }
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/profile');
  }

  model.update(dbmodels.user, userId, req.body, updating);
});

module.exports = router;
