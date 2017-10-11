var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/team');
var _ = require('underscore');

// get team page
router.get('/team/:id', function(req, res) {
  var showTeam = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('team', req.session.data);
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

// join or leave a team
router.post('/team/:id/:action', function(req, res) {
  var changingSubscription = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/team/' + req.session.data.team._id);
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
  var showTeam = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('team-edit', req.session.data);
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

router.post('/team/:id', function(req, res) {
  var deletingPlayer = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/team/' + req.params.id + '/edit');
  }

  var updatingTeam = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/team/' + req.params.id + '/edit');
  }

  if (req.body.playerId) {
    var ids = {
      userId: req.body.playerId,
      teamId: req.params.id,
    }
    model.deletePlayer(dbmodels.user, ids, deletingPlayer);
  } else {
    model.updateTeam(dbmodels.team, model.data.team._id, req.body, updatingTeam);
  }
});

module.exports = router;
