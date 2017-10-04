var _ = require('underscore');
var baseModel = require('./baseModel');

var login = _.extend(baseModel);

// login function
login.login = function(model, credentials, callback) {

  model.findOne({
    email: credentials.email
  }, function(err, profile) {
    if (err) return callback(err);
    profile.verifyPassword(credentials.password, function(err, isMatch) {
      if (err) return callback(err);
      if (!isMatch) baseModel.message = { text: 'Either email or password is invalid' };
      baseModel.set('userId', profile._id);
      // strip password from profile object
      baseModel.set('profile', _.omit(profile.toObject(), 'password'));
      callback(null);
    })
  });

}

module.exports = login;
