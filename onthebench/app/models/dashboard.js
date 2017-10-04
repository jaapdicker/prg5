var _ = require('underscore');
var baseModel = require('./baseModel');

var dashboard = _.extend(baseModel);

// fetch dashboard data
dashboard.fetchDashboard = function (models, searchQuery, callback) {
  models.club.find(searchQuery, function (err, clubs) {
    if (err) return callback(err);
    models.division.find(searchQuery, function (err, divisions) {
      if (err) return callback(err);
      baseModel.set('clubs', clubs);
      baseModel.set('divisions', divisions);
      callback(null);
    })
  });
}

// find clubs and teams
dashboard.search = function (models, searchQuery, callback) {
  var teams = [];
  var clubs = [];
  var clubCursor = models.club.find(searchQuery).cursor();
  clubCursor.on('data', function (doc) {
    clubs.push(doc);
    var teamCursor = models.team.find({ _clubId: doc._id }).cursor();
    teamCursor.on('data', function (doc) {
      teams.push(doc);
    }).on('close', function () {
      baseModel.set('clubs', clubs);
      baseModel.set('teams', teams);
      baseModel.set('search', searchQuery.name.$regex);
      callback(null);
    });
  });
};

module.exports = dashboard;
