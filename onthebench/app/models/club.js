var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');

var club = _.extend(baseModel);

// fetch club data
club.fetchClub = function (model, id, callback) {
  model.findById(id, function(err, club) {
    if(err || !club) {
      errorHandler('Could not find club', callback, err)
    } else {
      callback(null, { club: club });
    }
  });
}

// save new team
club.createTeam = function (models, data, ids, callback) {
  // team data
  var teamData = {
    name: data.club + ' ' + data.teamnr,
    teamnr: data.teamnr,
    matchday: data.matchday.toLowerCase(),
    class: data.class,
    _clubId: ids.clubId,
    _captainId: ids.userId
  }

  // check if team does not already excist
  models.team.find({
    name: teamData.name
  }, function (err, team) {
    if (err || team.length > 0) {
      errorHandler('Team does already excist', callback, err);
    } else {
      // save new team
      var newTeam = new models.team(teamData);
      newTeam.save(function (err, data) {
        if (err) {
          errorHandler('Could not create team', callback, err);
        } else {
          models.user.findByIdAndUpdate(ids.userId, { _teamId: data._id, 'password': 0 }, function(err, profile) {
            if (err) {
              errorHandler('Could not create team', callback, err);
            } else {
              callback(null, { team: data, profile: profile.toObject() });
            }
          });
        }
      });
    }
  });
}

module.exports = club;
