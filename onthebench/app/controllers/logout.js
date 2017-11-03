var express = require('express');
var router = express.Router();
var baseModel = require('../models/baseModel');

// get logout
router.get('/logout', function(req, res, next) {
  baseModel.clearData();
  req.session.data = baseModel.data;
  if (req.session.data.loggedIn) req.session.data.loggedIn = false;
  res.redirect('/login');
});

module.exports = router;
