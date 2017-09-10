var express = require('express');
var router = express.Router();

// get index
router.get('/', function(req, res, next) {
  var session = req.cookies['session'];

  // check if already logged in
  if (session && session.loggedIn) {
    res.render('index', { title: 'Express' });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
