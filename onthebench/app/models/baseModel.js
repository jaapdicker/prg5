var moment = require('moment');
var _ = require('underscore');
var dbmodels = require('../dbmodels');

var baseModel = function(data) {
  this.data = data;
}

baseModel.data = {
  clubs: [],
  club: [],
  divisions: [],
  events: [],
  event: {},
  menuitems: [
    'register',
    'login'
  ],
  message: {
    text: null
  },
  moment: moment,
  players: [],
  profile: {},
  search: null,
  userId: null,
  teams: [],
  team: []
}

// get function
baseModel.get = function (prop) {
  return this.data[prop];
}

// set function
baseModel.set = function (prop, value) {
  this.data[prop] = value;
}

var fetchClubs = function() {
  dbmodels.club.find({}, function(err, clubs) {
    baseModel.set('clubs', clubs);
  })
}

var fetchDivisions = function() {
  dbmodels.division.find({}, function(err, divisions) {
    baseModel.set('divisions', divisions);
  });
}

var fetchProfile = function(id) {
  dbmodels.user.findById(id, function(err, user) {
    baseModel.set('userId', user._id);
    baseModel.set('profile', _.omit(user.toObject(), 'password'));
    dbmodels.team.findById(user._teamId, function(err, team) {
      dbmodels.club.findById(team._clubId, function(err, club) {
        baseModel.set('club', club);
      });
    });
  });
}

baseModel.fetchData = function(id) {
  fetchProfile(id);
  fetchDivisions();
  fetchClubs();
}

module.exports = baseModel;
