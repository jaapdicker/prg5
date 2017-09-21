var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var register = require('../models/register');

// get register
router.get('/register', function (req, res) {
  var session = req.cookies['session'];

  if (session && session.loggedIn) res.redirect('/');
  res.render('register', {
    menuitems: ["register", "login"],
    error: {}
  });
});

// post register
router.post('/register', function (req, res) {

  var registering = function (err, data) {
    if (!data) {
      res.render('register', {
        menuitems: ["register", "login"],
        error: {
          message: "Email is already in use"
        }
      });
      return false;
    }
    res.render('login', {
      menuitems: ["register", "login"],
      error: {}
    });
  }

  register.prototype.register(dbmodels.user, req.body, registering);

});

module.exports = router;
