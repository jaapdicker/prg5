var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/login');

// get login
router.get('/login', function (req, res) {
  res.render('login', {
    menuitems: ["register", "login"],
    error: {}
  });
});

// post login
router.post('/login', function (req, res) {

  var logginIn = function (err, data) {
    var user = data ? data.data.profile : false;

    // show error message
    if (!user) {
      res.render('login', {
        menuitems: ["register", "login"],
        error: {
          message: "Either email or password is invalid"
        }
      });
      return false;
    }

    // create readable profile
    var cookieUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position
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
