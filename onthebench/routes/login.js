var express = require('express');
var router = express.Router();
var mongoose = require('../helpers/databaseHelper.js');
var dbmodels = require('../dbmodels');

// get login
router.get('/login', function(req, res) {
  var session = req.cookies['session'];

  if (session && session.loggedIn) {
    res.redirect('/');
  }
  res.render('login', {
    menuitems: ["register", "login"],
    error: {}
  });
});

// post login
router.post('/login', function(req, res) {
  console.log(req.body);
  dbmodels.user.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    if (err) {
      console.log('ERROR', err);
      res.render('login', {
        menuitems: ["register", "login"],
        error: {
          message: err
        }
      });
    } else if (user && user.email === req.body.email && user.password === req.body.password) {
      // set login cookie
      res.cookie('session', {
        user: user,
        loggedIn: true,
      });
      // redirect to index
      res.redirect('/');
    } else {
      res.render('login', {
        menuitems: ["register", "login"],
        error: {
          message: "Password and/or email not correct"
        }
      });
    }
  });
});

module.exports = router;
