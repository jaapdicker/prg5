var _ = require('underscore');
var baseModel = require('./baseModel');

var register = _.extend(baseModel);

// register function
register.register = function(model, user, callback) {
  var userData = user;
  model.find({
    email: user.email,
  }, function(err, user) {
    if (err || user.length < 0) return callback(err);
    if (user.length === 0) {
      var newUser = new model(userData);
      newUser.save(function(err, data) {
        if (err) return callback(err);
        callback(null);
      });
    }
  });
}

module.exports = register;
