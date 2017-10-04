var _ = require('underscore');
var moment = require('moment');
var baseModel = require('./baseModel');

var event = _.extend(baseModel);

// fetch event function
event.fetchEvent = function (models, id, callback) {
  models.event.findById(id, function (err, event) {
    if (err || !event) return callback(err);
    models.user.find({}, '-password')
    .where({ _teamId: event._teamId })
    .exec(function (err, players) {
      baseModel.set('players', players);
    });
    baseModel.set('event', event);
    callback(null);
  });
}

// create event function
event.createEvent = function(model, teamId, event, callback) {
  var formattedDate = moment(event.date, 'DD/MM/YYYY h:mm').format('DD/MM/YYYY h:mm');

  // event data
  var eventData = {
    type: event.type,
    name: event.name,
    date: formattedDate,
    location: event.location,
    _teamId: teamId,
  };

  // create new event
  var newEvent = new model(eventData);
  newEvent.save(function( err, data) {
    if (err) return callback(err);
    baseModel.set('event', event);
    callback(null);
  });
}


// check update
event.updatePresence = function (model, eventId, presenceData, callback) {
  var userEventData = {
    _personId: presenceData.playerId,
    _eventId: eventId,
    precence: presenceData.presence,
  };
  model.find({
    _personId: presenceData.playerId
  }, function(err, data) {
    if (err) return callback(err);
    console.log(data);
    if (data.length === 0) {
      var newUserEvent = new model(userEventData);
      newUserEvent.save(function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
    } else {
      model.findByIdAndUpdate({ _personId: presenceData.playerId }, userEventData, function(err, data) {
        console.log(data);
        if (err) return callback(err);
        callback(null, data);
      });
    }
  });
}

module.exports = event;
