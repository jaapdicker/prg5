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
  console.log(id);
  model.findById(id, function(err, event) {
    if (err || !event) return callback(err);
    callback(null, { event: event });
  });
}

// create event function
event.createEvent = function(model, event, callback) {
  // team id
  // location
  // date
  // name
  // type
}

module.exports = event;
