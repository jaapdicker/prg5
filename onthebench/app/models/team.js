var _ = require('underscore');
var baseModel = require('./baseModel');

var team = _.extend(baseModel);

// fetch team function
team.fetchTeamData = function(models, id, callback) {
  models.event.find().where({_teamId: id}).exec(function(err, events) {
    if (err) callback(err);
    models.team.findById(id, function(err, team) {
      if (err) callback(err);
      baseModel.set('events', events);
      baseModel.set('team', team);
      callback(null);
    });
  })
}

// join team
team.joinTeam = function(model, ids, callback) {
  model.findById(ids.userId, function(err, data) {
    var updatedUser = _.extend(data, { _teamId: ids.teamId });
    model.findByIdAndUpdate(ids.userId, updatedUser, function(err, user) {
      if (err) callback(err);
      baseModel.set('profile', user);
      callback(null);
    });
  });
}

// leave team
team.leaveTeam = function(model, ids, callback) {
  model.findById(ids.userId, function(err, data) {
    var updatedUser = _.extend(data, { _teamId: null });
    model.findByIdAndUpdate(ids.userId, updatedUser, function(err, user) {
      if (err) callback(err);
      baseModel.set('profile', user);
      callback(null);
    });
  });
}

module.exports = team;
