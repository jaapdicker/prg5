var _ = require('lodash');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');

var dashboard = _.extend(baseModel);

// fetch dashboard data
dashboard.fetchDashboard = function (models, callback) {
  var clubs = [];
  var clubCursor = models.club.find({}).cursor();
  clubCursor.eachAsync(function (doc) {
    models.team.count({ _clubId: doc._id }, function (err, teams) {
      doc.team_count = teams || "0";
      clubs.push(doc);
    });
  }).then(function() {
    models.division.find({}, function (err, divisions) {
      if (err) {
        errorHandler('', callback, err);
      } else {
        callback(null, { clubs: clubs, divisions: divisions });
      }
    });
  });
}


// find clubs and teams
dashboard.search = function (models, searchQuery, callback) {
  var nameSearch = searchQuery.name ? { name: searchQuery.name } : {};
  var teams = [];
  var clubs = [];

  var clubCursor = models.club.find(nameSearch).cursor();
  clubCursor.eachAsync(function(doc) {
    clubs.push(doc);
    var teamSearchQuery = {
      _clubId: doc._id,
    }
    if (searchQuery.class) teamSearchQuery.class = searchQuery.class;
    var teamCursor = models.team.find(teamSearchQuery).cursor();
    teamCursor.eachAsync(function(doc) {
      teams.push(doc);
    });
  }).then(function() {
    callback(null, {
      clubs: clubs,
      teams: teams,
      search: searchQuery.name.$regex + ' ' + searchQuery.class
    });
  });
};

module.exports = dashboard;
