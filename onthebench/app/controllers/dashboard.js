var express = require('express');
var router = express.Router();
var dbdashboards = require('../dbmodels');
var dashboard = require('../models/dashboard');

// get index
router.get('/', function(req, res) {
  var session = req.cookies['session'];

  var showClubs = function(err, data) {
    res.render('dashboard', {
      profile: session.user,
      clubs: data.data.clubs,
      teams: [],
      search: ""
    });
  }

  // check if already logged in
  if (session && session.loggedIn) {
    dashboard.prototype.showClubs(dbdashboards.club, {}, showClubs);
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res) {
  var showSearchResults = function(err, data) {
    res.render('dashboard', {
      profile: req.cookies['session'].user,
      clubs: data.data.clubs,
      teams: data.data.teams,
      search: req.body.search
    });
  }

  dashboard.prototype.search(dbdashboards, {
    name: {
      "$regex": req.body.search,
      "$options": "i"
    }}, showSearchResults);
});

module.exports = router;
