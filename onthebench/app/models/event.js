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
  }).then(function (event) {
    models.userEvent.find({ _eventId: event._id }, function(err, players) {
      if (err) {
        errorHandler('', callback, err);
      } else {
        callback(null, { event: event, playerPresence: players });
      }
    });
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
    _teamId: teamId,
  };

  // create new event
  var newEvent = new models.event(eventData);
  newEvent.save(function( err, data) {
    if (err || !data) {
      errorHandler('Something went wrong with the creation of a new event', callback, err);
    } else {
      var userEventList = _.map(players, function(player) {
        return {
          _playerId: player._id,
          _eventId: data._id,
          presence: 'empty'
        }
      });
      _.each(userEventList, function(userEventData) {
        var newUserEvent = new models.userEvent(userEventData);
        newUserEvent.save(function(err) {
          if (err) errorHandler('', callback, err);
        });
      });
      callback(null, { event: data });
    }
  });
}


// precense update
event.updatePresence = function (model, eventId, data, callback) {
  console.log(data);
  model.findOneAndUpdate({ _playerId: data.playerId, _eventId: eventId }, { presence: data.presence }, function(err, player) {
    if (err) {
      errorHandler('', callback, err);
    } else {
      callback(null);
    }
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
