var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/login');

// get login
router.get('/login', function (req, res) {
  if(model.data.userId) {
    res.redirect('/');
  }
  res.render('login', model.data);
});

// post login
router.post('/login', function (req, res) {

  var logginIn = function (err) {
    // show error message
    if (err) {
      res.render('login', model.data);
      return false;
    }
    model.set('message', {});

    // create readable profile
    var cookieUser = {
      id: model.data.profile._id,
      firstName: model.data.profile.firstName,
      lastName: model.data.profile.lastName,
      email: model.data.profile.email,
      position: model.data.profile.position,
      _teamId: model.data.profile._teamId
    };
    // set login cookie
    res.cookie('session', {
      user: cookieUser,
      loggedIn: true,
    });
    // redirect to index
    res.redirect('/');
  }

  model.login(dbmodels.user, {
    email: req.body.email,
    password: req.body.password
  }, logginIn);

});

module.exports = router;
