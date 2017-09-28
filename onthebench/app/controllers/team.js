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

module.exports = router;
