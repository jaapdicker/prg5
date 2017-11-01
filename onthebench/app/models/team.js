var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');
var moment = require('moment');

var team = _.extend(baseModel);

// fetch player call
var fetchPlayers = function (models, teamId, callback, data) {
   models.user.find({ 'password': 0}).where({_teamId: teamId}).exec(function (err, players) {
    if (err || !players) {
      errorHandler('No players could be found', callback, err);
    } else {
      var fullData = _.extend(data || {} , { players: players, moment: moment });
      callback(null, fullData);
    }
  });
}


// fetch team function
team.fetchTeamData = function (models, ids, callback) {
  var teamData = {};
  models.team.findById(ids.teamId, function (err, team) {
    if (err || !team) {
      errorHandler('', callback, err);
    }
    teamData.team = team;
  }).then(function(team) {
    models.event.find({ _teamId: team._id }, function(err, events) {
      if (err) {
        errorHandler('', callback, err);
      }
      teamData.events = events;
    }).then(function() {
      models.user.find({ _id: ids.userId }, { 'password': 0 }, function(err, user) {
        if (err) {
          errorHandler('', callback, err);
        }
        teamData.profile = user[0];
      }).then(function() {
        callback(null, teamData);
      });;
    })
  });
}


// update a team
team.updateTeam = function (model, id, data, callback) {
  var updatedTeam = _.extend(baseModel.get('team'), data);
  updatedTeam.name = baseModel.get('club').name + ' ' + data.teamnr;
  model.findByIdAndUpdate(id, updatedTeam, function (err, team) {
    if (err || !team) {
      errorHandler('Team could not be found', callback, err);
    } else {
      callback(null, { team: team });
    }
  });
}


// remove player from team (team from player)
team.deletePlayer = function (model, ids, callback) {
  model.findByIdAndUpdate(ids.userId, { _teamId: null }, function (err, player) {
    fetchPlayers(model, ids.teamid, callback);
  });
}


// join team
team.joinTeam = function (model, ids, callback) {
  model.findByIdAndUpdate(ids.userId, { _teamId: ids.teamId }, function (err, user) {
    if (err || !user) {
      errorHandler('User could not be found', callback, err);
    } else {
      callback(null, { profile: _.omit(user.toObject(), 'password') });
    }
  });
}


// leave team
team.leaveTeam = function (model, ids, callback) {
  model.findByIdAndUpdate(ids.userId, { _teamId: null }, function (err, user) {
    if (err || !user) {
      errorHandler('User could not be found', callback, err);
    } else {
      callback(null, { profile: _.omit(user.toObject(), 'password') });
    }
  });
}


// delete team
team.deleteTeam = function (models, ids, callback) {
  models.team.findByIdAndRemove(ids.teamId, function(err, doc) {
    if (err) {
      errorHandler('', callback, err);
    } else {
      models.user.findByIdAndUpdate(ids.userId, { _teamId: null }, function (err, user) {
        if (err || !user) {
          errorHandler('No user could be found', callback, err);
        } {
          callback(null, { profile: _.omit(user.toObject(), 'password') });
        }
      })
    }
  })
}

module.exports = team;
