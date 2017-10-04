var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/dashboard');

// get index
router.get('/', function(req, res) {
  var showDashboard = function (err, data) {
    res.render('dashboard', model.data);
  }
  if (model.data.profile._teamId) {
    res.redirect('/team/' + model.data.profile._teamId);
  } else {
    model.fetchDashboard(dbmodels, {}, showDashboard);
  }
});

router.post('/', function(req, res) {
  var showSearchResults = function(err, data) {
    res.render('dashboard', model.data);
  }

  model.search(dbmodels, {
    name: {
      "$regex": req.body.search,
      "$options": "i"
    }}, showSearchResults);
});

module.exports = router;
