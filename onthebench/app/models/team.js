var _ = require('underscore');
var s = require('underscore.string');

var team = function(data) {
  this.data = data;
}

// create data object
team.data = {}

// get function
team.get = function (prop) {
  return this.data[prop];
}

// set function
team.set = function(prop, value) {
  this.data[prop] = value;
}

// fetch team function
team.fetchTeamData = function(models, id, callback) {
  models.team.findById(id, function(err, team) {
    if (err) return callback(err);
    models.event.find({
      _teamId: id
    }, function(err, events) {
      if (err) return callback(err);
      callback(null, { team: team, events: events });
    })
  });
}

module.exports = team;
