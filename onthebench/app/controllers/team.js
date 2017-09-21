var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

// get team page
router.get('/team', function(req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');

  dbmodels.team.findOne({ _captain: req.cookies['session'].user.id }, function(err, team) {
    res.render('team', {
      profile: session.user,
      team: team
    });
  });
});

// get new team page
router.get('/team-new', function(req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');

  dbmodels.club.find({}, function(err, clubs) {
    res.cookie('clubs', clubs);
    res.render('team-new', {
      profile: session.user,
      clubs: clubs,
      message: {}
    })
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
