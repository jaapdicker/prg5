var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper.js');

var login = _.extend(baseModel);

// login function
login.login = function (model, credentials, callback) {

  model.findOne({
    email: credentials.email
  }, function (err, profile) {
    // if (err) return callback(err);
    if(err || !profile) {
      errorHandler('Either email or password is invalid', callback, err);
    } else {
      profile.verifyPassword(credentials.password, function (err, isMatch) {
        if (err || !isMatch) {
          errorHandler('Either email or password is invalid', callback, err);
        } else {
          var profileData = {
            userId: profile._id,
            message: {},
            profile: _.omit(profile.toObject(), 'password'),
            loggedIn: true
          };
          callback(null, profileData);
        }
      });
    }
  });
}

module.exports = login;
