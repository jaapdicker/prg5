var _ = require('underscore');
var baseModel = require('./baseModel');

var team = _.extend(baseModel);

// fetch player call
var fetchPlayers = function(model, teamId, callback) {
   model.find({}).where({_teamId: teamId}).exec(function(err, players) {
    if (err) callback(err);
    baseModel.set('players', players);
    callback(null);
  });
}

// fetch team function
team.fetchTeamData = function(models, id, callback) {
  models.event.find().where({_teamId: id}).exec(function(err, events) {
    if (err) callback(err);
    models.team.findById(id, function(err, team) {
      if (err) callback(err);
      fetchPlayers(models.user, id, callback);
      baseModel.set('events', events);
      baseModel.set('team', team.toObject());
    });
  });
}

// update a team
team.updateTeam = function(model, id, data, callback) {
  var updatedTeam = _.extend(baseModel.get('team'), data);
  updatedTeam.name = baseModel.get('club').name + ' ' + data.teamnr;
  model.findByIdAndUpdate(id, updatedTeam, function(err, team) {
    if (err) callback(err);
    console.log('team', team);
    baseModel.set('team', team);
    callback(null);
  });
}

// remove player from team (team from player)
team.deletePlayer = function(model, ids, callback) {
  model.findByIdAndUpdate(ids.userId, { _teamId: null }, function(err, player) {
    fetchPlayers(model, ids.teamid, callback);
  });
}

// join team
team.joinTeam = function(model, ids, callback) {
  model.findById(ids.userId, function(err, data) {
    var updatedUser = _.extend(data, { _teamId: ids.teamId });
    model.findByIdAndUpdate(ids.userId, updatedUser, function(err, user) {
      if (err) callback(err);
      baseModel.set('profile', user.toObject());
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
      baseModel.set('profile', user.toObject());
      callback(null);
    });
  });
}

module.exports = team;
