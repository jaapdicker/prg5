var moment = require('moment');

var event = function(data) {
  this.data = data;
}

// create data object
event.data = {}

// get function
event.get = function (prop) {
  return this.data[prop];
}

// set function
event.set = function(prop, value) {
  this.data[prop] = value;
}

// fetch event function
event.fetchEvent = function(model, id, callback) {
  model.findById(id, function(err, event) {
    if (err || !event) return callback(err);
    callback(null, { event: event });
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
    team: teamId,
  };

  // create new event
  var newEvent = new model(eventData);
  newEvent.save(function(err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
}

module.exports = event;
