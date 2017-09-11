var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// get register
router.get('/register', function(req, res) {
  res.render('register', {
    menuitems: ["register", "login"]
  });
});

// post register
router.post('/register', function(req, res) {
  // check if email exists
  dbmodels.user.find({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      console.log('ERROR', err);
      res.render('register', {
        menuitems: ["register", "login"],
        error: {
          message: err
        }
      });
    } else if (user.length === 0) {
      // save new user if email is not already used
      var user = new dbmodels.user(req.body);
      user.save(function(err, user) {
        if (err) {
          console.log('errors', err);
          res.render('register', {
            menuitems: ["register", "login"],
            error: {
              message: err
            }
          });
        }
      });

      // redirect to index
      res.redirect('/');
    } else {
      // show error message
      res.render('register', {
        menuitems: ["register", "login"],
        error: {
          message: 'Email is already in use'
        }
      });
    }
  });
});

module.exports = router;
