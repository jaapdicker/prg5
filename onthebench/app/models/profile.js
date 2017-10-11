var _ = require('underscore');
var baseModel = require('./baseModel');

var profile = _.extend(baseModel);

// update function
profile.update = function(model, id, data, callback) {

  model.findById(id, function(err, user) {
    if (err) return callback(err);
    // prevent empty password override
    if (data.password === '') data['password'] = user.password;
    // merge update old profile
    var updatedUser = _.extend(user, data);
    // save new profile with hashed password
    updatedUser.save(function(err, profile) {
      if (err) return callback(err);
      callback(null, { profile: _.omit(profile.toObject(), 'password') });
    });
  });

}

module.exports = profile;
