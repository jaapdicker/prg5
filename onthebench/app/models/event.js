var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');

var event = _.extend(baseModel);

// fetch event function
event.fetchEvent = function (models, eventId, callback) {
  models.event.findById(eventId, function (err, event) {
    if (err || !event) {
      errorHandler('Could not retreive any events, please try again', callback, err);
    }
    callback(null, { event: event });
  });
}


// create event function
event.createEvent = function(models, teamId, event, players, callback) {
  var formattedDate = baseModel.data.moment(event.date, 'DD/MM/YYYY h:mm').format('DD/MM/YYYY h:mm');
  // event data
  var eventData = {
    type: event.type,
    name: event.name,
    date: formattedDate,
    location: event.location,
    players: players,
    _teamId: teamId,
  };

  // create new event
  var newEvent = new models.event(eventData);
  newEvent.save(function( err, data) {
    if (err || !data) {
      errorHandler('Something went wrong with the creation of a new event', callback, err);
    } else {
      callback(null, { event: data, players: data.players });
    }
  });
}


// precense update
event.updatePresence = function (model, eventId, presenceData, playerlist, callback) {
  var eventUpdateData = _.map(playerlist, function(player) {
    _.each(presenceData, function(value, key) {
      if (player._id.toString() === key) {
        player.presence = typeof value === 'object' ? value[0] : value;
      }
    });
    return player;
  });

  Promise.all([eventUpdateData]).then(function(values) {
    model.findByIdAndUpdate(eventId, { players: values[0]}, function(err, event) {
      if (err) {
        errorHandler('', callback, err);
      } else {
        callback(null, { event: event });
      }
    });
  });
}

// update event
event.updateEvent = function (model, eventId, data, callback) {;
  var formattedDate = baseModel.data.moment(data.date, 'DD/MM/YYYY h:mm').format('MM/DD/YYYY h:mm');
  var eventData = {
    type: data.type,
    name: data.name,
    date: formattedDate,
    location: data.location,
  };

  model.findByIdAndUpdate(eventId, eventData, function(err, doc) {
    if (err || !event) {
      errorHandler('Event could not be found', callback, err);
    } else {
      callback(null, { event: eventData });
    }
  });
}


// delete event
event.deleteEvent = function (model, eventId, callback) {
  model.findByIdAndRemove(eventId, function (err, doc) {
    if (err) {
      errorHandler('', callback, err);
    } else {
      callback(null);
    }
  });
}

module.exports = event;
