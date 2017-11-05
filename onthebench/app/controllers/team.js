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
  };

  var ids = {
    userId: req.session.data.profile._id,
    teamId: req.params.id
  };

  model.fetchTeamData(dbmodels, ids, showTeam);
});


// join team
router.post('/team/:id/join', function (req, res) {
  var joiningTeam = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/team/' + req.params.id);
  }

  var ids = {
    userId: req.session.data.profile._id,
    teamId: req.params.id
  };

  model.joinTeam(dbmodels.user, ids, joiningTeam);
});


// leave team
router.post('/team/:id/leave', function (req, res) {
  var leavingTeam = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/');
  }

  var ids = {
    userId: req.session.data.profile._id,
    teamId: req.params.id
  };

  model.leaveTeam(dbmodels.user, ids, leavingTeam);
});


// delete team
router.post('/team/:id/delete', function (req, res) {
  var changingSubscription = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/team/' + req.params.id);
  }

  var ids = {
    userId: req.session.data.profile._id,
    teamId: req.params.id
  };

  model.deleteTeam(dbmodels.user, ids, deletingTeam);
});


// edit team
router.get('/team/:id/edit', function(req, res) {
  console.log(req.session.data);
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
