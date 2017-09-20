var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var dashboard = require('../models/dashboard');

// get index
router.get('/', function(req, res) {
  var session = req.cookies['session'];

  var showClubs = function(err, data) {
    res.render('index', {
      profile: session.user,
      clubs: data.data.clubs,
      teams: [],
      search: ""
    });
  }

  // check if already logged in
  if (session && session.loggedIn) {
    dashboard.prototype.showClubs(dbmodels.club, {}, showClubs);
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res) {
  // dbmodels.club.find({
  //   name: {
  //     "$regex": req.body.search,
  //     "$options": "i"
  //   }
  // }, function(err, clubs) {
  //   if(err) {
  //     res.render('index', {
  //       profile: req.cookies['session'].user,
  //       clubs: [],
  //       teams: [],
  //       search: req.body.search
  //     });
  //   }

  //   dbmodels.team.find({ _clubId: clubs[0]._id }, function(err, teams) {
  //     res.render('index', {
  //       profile: req.cookies['session'].user,
  //       clubs: clubs,
  //       teams: teams,
  //       search: req.body.search
  //     });
  //   });
  // });

  console.log(req.body.search);

  var showSearchResults = function(err, data) {
    res.render('index', {
      profile: req.cookies['session'].user,
      clubs: data.data.clubs,
      teams: data.data.teams,
      search: req.body.search
    });
  }

  dashboard.prototype.search(dbmodels, {
    name: {
      "$regex": req.body.search,
      "$options": "i"
    }}, showSearchResults);

});

module.exports = router;
