var login = function (data) {
  this.data = data;
}

//  create data object
login.data = {};

// get function
login.get = function (prop) {
  return this.data[prop];
}

// set function
login.set = function(prop, value) {
  this.data[prop] = value;
}

// login function
login.login = function(model, credentials, callback) {

  model.findOne({
    email: credentials.email
  }, function(err, profile) {
    if (err) return callback(err);
    profile.verifyPassword(credentials.password, function(err, isMatch) {
      if (err || !isMatch) return callback(err);
      callback(null, new login({ profile: profile }));
    })
  });

}

module.exports = login;
