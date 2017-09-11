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
  // dbmodels.user.find({
  //   email: req.body.email
  // }, function(err, success) {
  //   if (err) res.send('There already is an account with this email');
  //   if (success) {
  //     // save new user
  //     var user = new dbmodels.user(req.body);
  //     user.save(function(err, user) {
  //       if (err) {
  //         console.log('errors', err);
  //       } else {
  //         console.log('commit register');
  //       }
  //     });

  //     // redirect to indexOf
  //     res.redirect('/');
  //   }
  // })
  var user = req.body;
  console.log(req);
});

module.exports = router;
