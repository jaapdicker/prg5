var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');
var model = require('../models/event');

// get event page
router.get('/event', function(req, res) {
  var session = req.cookies['session'];

  res.render('event-new', {
    profile: session.user,
    menuitems: [],
    message: {
      text: ''
    }
  });
});

router.get('/event/:id', function(req, res) {
  var session = req.cookies['session'];
  var eventId = req.params.id;

  if (session && !session.loggedIn) res.redirect('/login');

  var showEvent = function(err, data) {
    if (data) {
      res.render('event', {
        profile: session.user,
        event: data.event,
        menuitems: []
      });
    }
  }

  model.fetchEvent(dbmodels.event, eventId, showEvent);
});

module.exports = router;
