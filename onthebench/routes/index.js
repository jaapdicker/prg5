var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// get index
router.get('/', function(req, res) {
  var session = req.cookies['session'];

  // check if already logged in
  if (session && session.loggedIn) {
    dbmodels.club.find({}, function(err, clubs) {
      res.render('index', {
        profile: session.user,
        clubs: clubs,
        teams: [],
        search: ""
      })
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res) {
  dbmodels.club.find({
    name: {
      "$regex": req.body.search,
      "$options": "i"
    }
  }, function(err, club) {
    if(err) {
      res.render('index', {
        profile: req.cookies['session'],
        clubs: [],
        teams: [],
        search: req.body.search
      });
    }
    dbmodels.team.find({ club: club._id }, function(err, teams) {
      res.render('index', {
        profile: req.cookies['session'],
        clubs: club,
        teams: teams,
        search: req.body.search
      });
    });
  });
});

module.exports = router;
