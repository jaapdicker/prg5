var express = require('express');
var router = express.Router();
var moment = require('moment');
var dbmodels = require('../dbmodels');
var model = require('../models/team');

// get team page
router.get('/team/:id', function(req, res) {
  var session = req.cookies['session'];

  var showTeam = function(err, data) {
    if (data) {
      // set cookies
      res.cookie('team', data.team);
      res.cookie('events', data.events);
      res.header('Cache-Control', 'no-store');
      res.render('team', {
        profile: session.user,
        team: data.team ? data.team : {},
        events: data.events ? data.events : [],
        menuitems: [],
        moment: moment
      });
    }
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

router.post('/team/:id/:action', function(req, res) {
  var changingSubscription = function(err, data) {
    // update session cookie
    var user = data.user;
    var cookieUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position,
      _teamId: user._teamId,
    };
    res.cookie('session', {
      user: cookieUser,
      loggedIn: true,
    });

    // redirect back to team page
    res.redirect('/team/' + data.team);
  };

  var ids = {
    userId: req.cookies['session'].user.id,
    teamId: req.params.id
  };

  if (req.params.action === 'join') {
    model.joinTeam(dbmodels.user, ids, changingSubscription);
  } else if (req.params.action === 'leave') {
    model.leaveTeam(dbmodels.user, ids, changingSubscription);
  }

});

module.exports = router;
