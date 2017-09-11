var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// get profile page
router.get('/profile', function(req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');

  res.render('profile', {
    profile: session.user,
    message: {},
  });
});

// post profile update
router.post('/profile', function(req, res) {
  var userId = req.cookies['session'].user.id;
  // find only user and update

  dbmodels.user.findOneAndUpdate({ _id: userId }, req.body, function(err, profile) {
    if(err) {
      res.render('profile', {
        profile: req.cookies['session'].user,
        message: {
          text: err
        }
      });
    }

    res.render('profile', {
      profile: req.cookies['session'].user,
      message: {
        text: "Profile updated"
      }
    });
  });
});

module.exports = router;
