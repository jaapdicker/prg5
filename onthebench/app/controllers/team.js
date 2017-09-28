var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/team');

// get team page
router.get('/team/:id', function(req, res) {
  var session = req.cookies['session'];

  var showTeam = function(err, data) {
    if (data) {
      res.render('team', {
        profile: session.user,
        team: data.team ? data.team : {},
        events: data.events ? data.events : [],
        menuitems: []
      });
    }
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});






// CODE TO REFACTOR







// get new team page
router.get('/team-new', function(req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');

  dbmodels.club.find({}, function(err, clubs) {
    res.cookie('clubs', clubs);
    dbmodels.division.find({}, function(err, divisions) {
      res.cookie('divisions', divisions)
      res.render('team-new', {
        profile: session.user,
        clubs: clubs,
        divisions: divisions,
        message: {},
        menuitems: []
      })
    });
  });
});

// team create post
router.post('/team-new', function(req, res) {
  // check if team excists
  dbmodels.team.findOne({name: req.body.club + " " + req.body.teamnr}, function(err, team) {
    console.log('found one');
    if (team) {
      res.render('team-new', {
        profile: req.cookies['session'].user,
        clubs: req.cookies['clubs'],
        menuitems: [],
        message: {
          text: "Team allready exists"
        }
      })
    }
    return false;
  });

  // save new team
  dbmodels.club.findOne({name: req.body.club}, function(err, club) {
    var newTeam = {
      name: req.body.club + " " + req.body.teamnr,
      matchday: req.body.matchday,
      menuitems: [],
      class: req.body.class,
      _clubId: club._id,
      _captain: req.cookies['session'].user.id
    }
    var team = new dbmodels.team(newTeam);
    team.save(function(err, team) {
      res.redirect('team');
    });
  });
});

module.exports = router;
