var express = require('express');
var router = express.Router();
var baseModel = require('../models/baseModel');

// get logout
router.get('/logout', function(req, res, next) {
  baseModel.clearData();
  req.session.data = baseModel.data;
  res.redirect('/login');
});

module.exports = router;
