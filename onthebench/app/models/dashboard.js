var dashboard = function (data) {
  this.data = data;
}

// create data object
dashboard.prototype.data = {};

// get function
dashboard.prototype.get = function (prop) {
  return this.data[prop];
}

// set function
dashboard.prototype.set = function (prop, value) {
  this.data[prop] = value;
}

// show clubs
dashboard.prototype.showClubs = function (model, searchQuery, callback) {
  model.find(searchQuery, function(err, clubs) {
    if (err) return callback(err);
    callback(null, new dashboard({clubs: clubs}));
  });
}

// find clubs and teams
dashboard.prototype.search = function (models, searchQuery, callback) {
  var teams = [];
  var clubs = [];
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
