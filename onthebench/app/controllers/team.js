var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/team');

// get team page
router.get('/team/:id', function(req, res) {
  var showTeam = function(err, data) {
    res.render('team', model.data);
  }

  model.fetchTeamData(dbmodels, req.params.id, showTeam);
});

router.post('/team/:id/:action', function(req, res) {
  var changingSubscription = function(err, data) {
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

module.exports = router;
