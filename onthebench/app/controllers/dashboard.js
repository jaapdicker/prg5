var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/dashboard');
var _ = require('underscore');

// get index
router.get('/', function(req, res) {
  var showDashboard = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('dashboard', req.session.data);
  }

  if (req.session.data.profile._teamId) {
    res.redirect('/team/' + req.session.data.profile._teamId);
  } else {
    model.fetchDashboard(dbmodels, showDashboard);
  }
});

router.post('/', function(req, res) {
  var showSearchResults = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('dashboard', req.session.data);
  }

  var searchQuery = {
    search: req.body.search ? req.body.search : "",
    divisions: req.body.divisions ? req.body.divisions : "",
    matchday: req.body.matchday ? req.body.matchday : ""
  };

  model.search(dbmodels, {
    name: {
      "$regex": searchQuery.search,
      "$options": "i"
    },
    class: searchQuery.divisions,
    matchday: searchQuery.matchday
  }, showSearchResults);
});

module.exports = router;
