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
  var teams = [];
  var clubs = [];
  var clubCursor = models.club.find(searchQuery).cursor();
  clubCursor.on('data', function (doc) {
    clubs.push(doc);
    var teamCursor = models.team.find({ _clubId: doc._id }).cursor();
    teamCursor.on('data', function (doc) {
      teams.push(doc);
    }).on('close', function () {
      var data = {
        clubs: clubs,
        teams: teams,
        search: searchQuery.name.$regex
      }
      callback(null, data);
    });
  });
};

module.exports = dashboard;
