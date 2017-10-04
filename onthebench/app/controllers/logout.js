var express = require('express');
var router = express.Router();
var baseModel = require('../models/baseModel');

// get logout
router.get('/logout', function(req, res) {
  baseModel.set('userId', null);
  res.clearCookie('session');
  res.redirect('/login');
});

module.exports = router;
