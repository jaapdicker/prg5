var _ = require('underscore');
var baseModel = require('./baseModel');

var club = _.extend(baseModel);

// fetch club data
club.fetchClub = function (model, id, callback) {
  model.findById(id, function(err, club) {
    if (err) return callback(err);
    baseModel.set('club', club);
    callback(null);
  });
}

// save new team
club.createTeam = function (model, data, ids, callback) {
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
  model.find({
    name: teamData.name
  }, function (err, team) {
    if (err || team.length < 0) callback(err);
    // save new team
    var newTeam = new model(teamData);
    newTeam.save(function (err, data) {
      if (err) return callback(err);
      baseModel.set('team', data);
      callback(null);
    });
  });
}

module.exports = club;
