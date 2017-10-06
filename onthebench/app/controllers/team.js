var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/team');

// get team page
router.get('/team/:id', function(req, res) {
  var showTeam = function(err) {
    res.render('team', model.data);
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

// join or leave a team
router.post('/team/:id/:action', function(req, res) {
  var changingSubscription = function(err) {
    res.redirect('/team/' + model.data.team._id);
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

router.get('/team/:id/edit', function(req, res) {
  console.log('get team edit');
  var showTeam = function(err) {
    res.render('team-edit', model.data);
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

router.post('/team/:id', function(req, res) {
  var deletingPlayer = function(err) {
    // res.render('team-edit', model.data);
    res.redirect('/team/' + req.params.id + '/edit');
  }

  var updatingTeam = function(err) {
    // res.render('team-edit', model.data);
    res.redirect('/team/' + req.params.id + '/edit');
  }

  if (req.body.playerId) {
    var ids = {
      userId: req.body.playerId,
      teamId: req.params.id,
    }
    model.deletePlayer(dbmodels.user, ids, deletingPlayer);
  } else {
    console.log('update');
    model.updateTeam(dbmodels.team, model.data.team._id, req.body, updatingTeam);
  }
});

module.exports = router;
