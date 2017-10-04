var express = require('express');
var router = express.Router();
var baseModel = require('../models/baseModel');

// get logout
router.get('/logout', function(req, res, next) {
  res.clearCookie('session');
  baseModel.set('userId', null);
  baseModel.set('profile', {});
  res.redirect('/login');
});

module.exports = router;
