var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/profile');

// get profile page
router.get('/profile', function (req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');
  res.render('profile', {
    profile: session.user,
    message: {},
  });
});

// post profile update
router.post('/profile', function (req, res) {
  var userId = req.cookies['session'].user.id;

  // find only user and update (findOneAndUpdate not possible with password hashing)
  var updating = function (err, data) {
    if(err) {
      res.render('profile', {
        profile: req.cookies['session'].user,
        message: {
          text: err
        }
      });
      return false;
    }

    // update session cookie
    var user = data.data.profile;
    var cookieUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position
    };
    res.cookie('session', {
      user: cookieUser,
      loggedIn: true,
    });
    res.render('profile', {
      profile: user,
      message: {
        text: "Profile updated"
      }
    });
  }

  model.update(dbmodels.user, userId, req.body, updating);
});

module.exports = router;
