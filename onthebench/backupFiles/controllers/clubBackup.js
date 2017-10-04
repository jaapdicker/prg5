var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/club');

router.get('/club/:id', function(req, res) {
  var session = req.cookies['session'];
  var divisions = req.cookies['divisions'];

  var showNewTeamForm = function(err, data) {
    res.render('team-new', {
      profile: session.user,
      divisions: divisions,
      club: data.club,
      message: {},
      menuitems: []
    });
  }

  model.fetchClub(dbmodels.club, req.params.id, showNewTeamForm);

});

router.post('/club/:id', function(req, res) {
  var session = req.cookies['session'];
  var divisions = req.cookies['divisions'].divisions;
  var ids = {
    clubId: req.params.id,
    userId: session.user.id
  };

  var creatingTeam = function(err, data) {
    res.redirect('/team/' + data._id);
  }

  model.createTeam(dbmodels.team, req.body, ids, creatingTeam);

});

module.exports = router;
