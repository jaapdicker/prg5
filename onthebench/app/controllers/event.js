var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/event');
var moment = require('moment');
var _ = require('underscore');

// get event page
router.get('/event/:id/new', function(req, res) {
  res.render('event-new', req.session.data);
});

router.post('/event/:id/new', function(req, res) {
  var teamId = req.params.id;

  var creatingEvent = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    if (err) {
      res.render('event-new', req.session.data);
    } else {
      res.redirect('/event/' + req.session.data.event._id);
    }
  }

  model.createEvent(dbmodels, teamId, req.body, req.session.data.players, creatingEvent);
});

router.get('/event/:id', function(req, res) {
  var showEvent = function(err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('event', req.session.data);
  }

  model.fetchEvent(dbmodels, req.params.id, showEvent);
});

router.post('/event/:id', function (req, res) {
  var updatingPresence = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.render('event', _.extend(req.session.data, data));
  }

  model.updatePresence(dbmodels.event, req.params.id, req.body, req.session.data.event.players, updatingPresence);
});

router.get('/event/:id/edit', function (req, res) {
  res.render('event-edit', req.session.data);
});

router.post('/event/:id/:action', function (req, res) {
  var updatingEvent = function (err, data) {
    req.session.data = _.extend(req.session.data, data);
    res.redirect('/event/' + req.params.id);
  }

  var deletingEvent = function (err) {
    res.redirect('/');
  }

  if (req.params.action === 'delete') {
    model.deleteEvent(dbmodels.event, req.params.id, deletingEvent);
  } else {
    model.updateEvent(dbmodels.event, req.params.id, req.body, updatingEvent);
  }
});

module.exports = router;
