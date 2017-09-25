var dashboard = function (data) {
  this.data = data;
}

// create data object
dashboard.data = {};

// get function
dashboard.get = function (prop) {
  return this.data[prop];
}

// set function
dashboard.set = function (prop, value) {
  this.data[prop] = value;
}

// fetch dashboard data
dashboard.fetchDashboard = function (models, searchQuery, callback) {
  models.club.find(searchQuery, function(err, clubs) {
    if (err) return callback(err);
    models.division.find(searchQuery, function(err, divisions) {
      if (err) return callback(err);
      callback(null, new dashboard({
        clubs: clubs,
        divisions: divisions
      }));
    })
  });
}

var findClubs = function (model, searchQuery) {
  var clubs = "";
}

// filter clubs or teams

// find clubs and teams
dashboard.search = function (models, searchQuery, callback) {
  var teams = [];
  var clubs = [];
  console.log(searchQuery);
  var clubCursor = models.club.find(searchQuery).cursor();
  clubCursor.on('data', function(doc) {
    clubs.push(doc);
    var teamCursor = models.team.find({ _clubId: doc._id }).cursor();
    teamCursor.on('data', function(doc) {
      teams.push(doc);
    }).on('close', function() {
      callback(null, new dashboard({
        clubs: clubs,
        teams: teams
      }));
    });
  });
};

module.exports = dashboard;
