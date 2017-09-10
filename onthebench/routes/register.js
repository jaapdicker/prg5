var express = require('express');
var router = express.Router();
var mongoClient = require('../helpers/dbconnect');

// get register
router.get('/register', function(req, res) {
  // load data form db

  res.render('register', {
    menuitems: ["register", "login"]
  });
});

// post register
router.post('/register', function(req, res) {
  console.log("REQ", req);

  // redirect to index
  // res.redirect('/');
  res.send('registered in');
});

module.exports = router;
