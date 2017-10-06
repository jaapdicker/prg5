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
          baseModel.set('userId', profile._id);
          // clear posible error messages
          baseModel.set('message', {});
          // strip password from profile object
          baseModel.set('profile', _.omit(profile.toObject(), 'password'));
          // fetch a lot of data
          baseModel.fetchData(profile._id);
          callback(null);
        }
      });
    }
  });
}

module.exports = login;
