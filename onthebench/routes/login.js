var express = require('express');
var router = express.Router();

// get login
router.get('/login', function(req, res) {
  // load data form db

  res.render('login', {
    menuitems: ["register", "login"]
  });
});

// post login
router.post('/login', function(req, res) {
  var loginJSON = req.body;

  // redirect to index
  // res.redirect('/');
  res.send('logged in');
});

module.exports = router;
