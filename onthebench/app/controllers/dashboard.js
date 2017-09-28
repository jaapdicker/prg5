var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/dashboard');

// get index
router.get('/', function(req, res) {
  var session = req.cookies['session'];

  var showDashboard = function (err, data) {
    res.cookie('divisions', { divisions: data.data.divisions });
    res.render('dashboard', {
      profile: session.user,
      clubs: data.data.clubs,
      divisions: data.data.divisions,
      teams: [],
      search: "",
      menuitems: []
    });
  }

  model.fetchDashboard(dbmodels, {}, showDashboard);
});

router.post('/', function(req, res) {
  var showSearchResults = function(err, data) {
    res.render('dashboard', {
      profile: req.cookies['session'].user,
      clubs: data.data.clubs,
      divisions: req.cookies['divisions'].divisions,
      teams: data.data.teams,
      search: req.body ? req.body.search : "",
      menuitems: []
    });
  }

  model.search(dbmodels, {
    name: {
      "$regex": req.body.search,
      "$options": "i"
    }}, showSearchResults);
});

module.exports = router;
