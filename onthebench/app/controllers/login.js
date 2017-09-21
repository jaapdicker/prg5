var express = require('express');
var router = express.Router();
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
  // get the only user
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
      // remove password from db user
      var cookieUser = {
        id: user._id,
        fullName: user.firstName + ' ' + user.lastName,
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
