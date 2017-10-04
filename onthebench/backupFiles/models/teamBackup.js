var moment = require('moment');
var _ = require('underscore');

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
  models.event.find().where({team: id}).exec(function(err, events) {
    if (err) callback(err);
    models.team.findById(id, function(err, team) {
      if (err) callback(err);
      callback(null, {events: events, team: team});
    });
  })
}

// join team
team.joinTeam = function(model, ids, callback) {
  model.findById(ids.userId, function(err, data) {
    var updatedUser = _.extend(data, { _teamId: ids.teamId });
    model.findByIdAndUpdate(ids.userId, updatedUser, function(err, user) {
      if (err) callback(err);
      callback(null, { user: user, team: ids.teamId });
    });
  });
}

// leave team
team.leaveTeam = function(model, ids, callback) {
  model.findById(ids.userId, function(err, data) {
    var updatedUser = _.extend(data, { _teamId: null });

    model.findByIdAndUpdate(ids.userId, updatedUser, function(err, user) {
      if (err) callback(err);
      callback(null, { user: user, team: ids.teamId });
    });
  });
}

module.exports = team;
