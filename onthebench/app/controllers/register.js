var express = require('express');
var router = express.Router();
var _ = require('underscore');
var dbmodels = require('../dbmodels');
var model = require('../models/register');

// get register
router.get('/register', function (req, res) {
  if(req.session.data.userId) {
    res.redirect('/');
  }
  res.render('register', req.session.data);
});

// post register
router.post('/register', function (req, res) {

  // callback function
  var registering = function (err, data) {
    if (err) {
      req.session.data = _.extend(req.session.data, err);
      res.render('register', req.session.data);
    } else {
      res.redirect('/login');
    }
  }

  // do register
  model.register(dbmodels.user, req.body, registering);

});

module.exports = router;
