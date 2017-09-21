var register = function (data) {
  this.data = data;
}

// create data object
register.prototype.data = {}

// get function
register.prototype.get = function (prop) {
  return this.data[prop];
}

// set function
register.prototype.set = function(prop, value) {
  this.data[prop] = value;
}

// register function
register.prototype.register = function(model, user, callback) {
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

// update function

module.exports = register;
