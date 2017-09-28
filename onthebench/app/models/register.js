var register = function (data) {
  this.data = data;
}

// create data object
register.data = {}

// get function
register.get = function (prop) {
  return this.data[prop];
}

// set function
register.set = function(prop, value) {
  this.data[prop] = value;
}

// register function
register.register = function(model, user, callback) {
  var userData = user;
  model.find({
    email: user.email,
  }, function(err, user) {
    if (err || user.length < 0) return callback(err);
    if (user.length === 0) {
      var newUser = new model(userData);
      newUser.save(function(err) {
        if (err) return callback(err);
        callback(null, new register());
      });
    }
  })
}

module.exports = register;
