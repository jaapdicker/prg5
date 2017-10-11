var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/login');
var _ = require('underscore');

// get login
router.get('/login', function (req, res) {
  if(req.session.data && req.session.data.loggedIn) {
    res.redirect('/');
  }
  res.render('login', req.session.data);
});

// post login
router.post('/login', function (req, res) {
  var logginIn = function (err, data) {
    // show error message
    if (err) {
      req.session.data.message.text = err;
      res.render('login', req.session.data);
      return false;
    }

    // update session
    req.session.data = _.extend(req.session.data, data);

    // redirect to index
    res.redirect('/');
  }

  model.login(dbmodels.user, {
    email: req.body.email,
    password: req.body.password
  }, logginIn);

});

module.exports = router;
