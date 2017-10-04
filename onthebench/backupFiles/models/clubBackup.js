var club = function (data) {
  this.data = data;
}

// create data object
club.data = {}

// get function
club.get = function (prop) {
  return this.data[prop];
}

// set function
club.set = function (prop, value) {
  this.data[prop] = value;
}

// fetch club data
club.fetchClub = function (model, id, callback) {
  model.findById(id, function(err, club) {
    if (err) return callback(err);
    callback(null, { club: club });
  });
}

// save new team
club.createTeam = function (model, data, ids, callback) {

  // team data
  var teamData = {
    name: data.club + ' ' + data.teamnr,
    matchday: data.matchday,
    class: data.class,
    _clubId: ids.clubId,
    _captain: ids.userId
  }

  // check if team does not already excist
  model.find({
    name: teamData.name
  }, function(err, team) {
    if (err || team.length < 0) callback(err);
    // save new team
    var newTeam = new model(teamData);
    newTeam.save(function(err, data) {
      if (err) return callback(err);
      callback(null, data);
    });
  });
}

module.exports = club;
