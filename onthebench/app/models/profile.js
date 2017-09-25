var _ = require('lodash');

var profile = function (data) {
  this.data = data;
}

// create data object
profile.data = {}

// get function
profile.get = function (prop) {
  return this.data[prop];
}

// set function
profile.set = function(prop, value) {
  this.data[prop] = value;
}

// update function
profile.update = function(model, id, data, callback) {

  model.findById(id, function(err, user) {
    if (err) return callback(err);
    // prevent empty password override
    if (data.password === '') data['password'] = user.password;
    // merge update old profile
    var updatedUser = _.extend(user, data);
    // save new profile with hashed password
    updatedUser.save(function(err, doc) {
      if (err) return callback(err);
      callback(null, new profile({ profile: doc }));
    });
  });

}

module.exports = profile;
