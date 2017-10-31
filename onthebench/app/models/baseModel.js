var moment = require('moment');
var _ = require('underscore');
var dbmodels = require('../dbmodels');

var baseModel = function(data) {
  this.data = data;
}

var defaultData = {
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
  userId: '',
  teams: [],
  team: []
}

baseModel.data = defaultData;

// get function
baseModel.get = function (prop) {
  return this.data[prop];
}

// set function
baseModel.set = function (prop, value) {
  this.data[prop] = value;
}


var fetchClubs = function(req) {
  dbmodels.club.find({}, function(err, clubs) {
    req.session.data.clubs = clubs;
  });
}

var fetchDivisions = function(req) {
  dbmodels.division.find({}, function(err, divisions) {
    req.session.data.divisions = divisions;
  });
}

var fetchProfile = function(id, req) {
  dbmodels.user.findById(id, {'password': 0}, function(err, user) {
    if(user._teamId) {
      dbmodels.team.findById(user._teamId, function(err, team) {
        dbmodels.club.findById(team._clubId, function(err, club) {
          req.session.data.club = club;
        });
      });
    }
  });
}

// fetch base data
baseModel.fetchData = function(id, req) {
  if (id) fetchProfile(id, req);
  fetchDivisions(req);
  fetchClubs(req);
}

// clear on logout
baseModel.clearData = function() {
  baseModel.data = defaultData;
}

module.exports = baseModel;
