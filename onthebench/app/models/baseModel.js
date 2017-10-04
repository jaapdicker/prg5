var moment = require('moment');
var _ = require('underscore');
var dbmodels = require('../dbmodels');

var baseModel = function(data) {
  this.data = data;
}

baseModel.data = {
  userId: null,
  profile: {},
  divisions: [],
  clubs: [],
  club: [],
  teams: [],
  team: [],
  events: [],
  search: null,
  menuitems: [
    'register',
    'login'
  ],
  message: {
    text: null
  },
  moment: moment
}

// get function
baseModel.get = function (prop) {
  return this.data[prop];
}

// set function
baseModel.set = function (prop, value) {
  this.data[prop] = value;
}

baseModel.fetchProfile = function(id) {
  dbmodels.user.findById(id, function(err, user) {
    baseModel.set('userId', user._id);
    baseModel.set('profile', user);
  });
}

module.exports = baseModel;
