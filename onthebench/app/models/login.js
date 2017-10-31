var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');

var login = _.extend(baseModel);

// login function
login.login = function (model, credentials, callback) {
  var caseInsensitiveEmail = new RegExp(credentials.email, "i");
  model.findOne({
    email: { $regex : caseInsensitiveEmail }
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
