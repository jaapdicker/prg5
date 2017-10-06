var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/club');

router.get('/club/:id', function(req, res) {
  var showNewTeamForm = function(err, data) {
    res.render('team-new', model.data);
  }
  model.fetchClub(dbmodels.club, req.params.id, showNewTeamForm);
});

router.post('/club/:id', function(req, res) {
  var ids = {
    clubId: req.params.id,
    userId: model.data.userId
  };

  var creatingTeam = function(err, data) {
    res.redirect('/team/' + model.data.team._id);
  }

  model.createTeam(dbmodels.team, req.body, ids, creatingTeam);

});

module.exports = router;