var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/event');

// get event page
router.get('/event/:id/new', function(req, res) {
  res.render('event-new', data.model);
});

router.post('/event/:id/new', function(req, res) {
  var teamId = req.params.id;

  var creatingEvent = function(err) {
    if (err) res.render('/event/' + teamId + '/new', model.data);
    res.redirect('/event/' + model.data.event._id);
  }

  model.createEvent(dbmodels.event, teamId, req.body, creatingEvent);
});

router.get('/event/:id', function(req, res) {
  var showEvent = function(err, data) {
    if (err) res.render('event', model.data);
    res.render('event', model.data);
  }

  model.fetchEvent(dbmodels, req.params.id, showEvent);
});

router.post('/event/:id', function (req, res) {
  var updatingPresence = function (err, data) {
    res.render('event', model.data);
  }


  model.updatePresence(dbmodels.userEvent, req.params.id, req.body, updatingPresence);
});

module.exports = router;
