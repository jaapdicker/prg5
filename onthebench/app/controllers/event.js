var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/event');
var _ = require('underscore');

// get event page
router.get('/event/:id/new', function(req, res) {
  req.session.data = _.extend(req.session.data, data);
  res.render('event-new', data.model);
});

router.post('/event/:id/new', function(req, res) {
  var teamId = req.params.id;

  var creatingEvent = function(err, data) {
    if (err) res.render('/event/' + teamId + '/new', req.session.data);
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/event/' + req.session.data.event._id);
  }

  model.createEvent(dbmodels.event, teamId, req.body, creatingEvent);
});

router.get('/event/:id', function(req, res) {
  var showEvent = function(err, data) {
    if (err) res.render('event', req.session.data);
    req.session.data = _.extend(req.session.data, data);
    res.render('event', req.session.data);
  }

  model.fetchEvent(dbmodels, req.params.id, showEvent);
});

router.post('/event/:id', function (req, res) {
  var updatingPresence = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('event', req.session.data);
  }


  model.updatePresence(dbmodels.userEvent, req.params.id, req.body, updatingPresence);
});

module.exports = router;
