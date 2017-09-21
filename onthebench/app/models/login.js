var login = function (data) {
  this.data = data;
}

//  create data object
login.prototype.data = {};

// get function
login.prototype.get = function (prop) {
  return this.data[prop];
}

// set function
login.prototype.set = function(prop, value) {
  this.data[prop] = value;
}

// login function
login.prototype.login = function(model, credentials, callback) {
  model.findOne({
    email: credentials.email,
    password: credentials.password
  }, function(err, profile) {
    if (err) return callback(err);
    callback(null, new login({ profile: profile }));
  })
}

module.exports = login;
