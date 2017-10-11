var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/club');
var _ = require('underscore');

router.get('/club/:id', function(req, res) {
  var showNewTeamForm = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('team-new', req.session.data);
  }
  model.fetchClub(dbmodels.club, req.params.id, showNewTeamForm);
});

router.post('/club/:id', function(req, res) {
  var ids = {
    clubId: req.params.id,
    userId: req.session.data.userId
  };

  var creatingTeam = function(err, data) {
    req.session.data = _.extend(req.session.data, data)
    res.redirect('/team/' + req.session.data.team._id);
  }

  model.createTeam(dbmodels.team, req.body, ids, creatingTeam);

});

module.exports = router;
