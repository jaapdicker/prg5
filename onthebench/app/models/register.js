var _ = require('underscore');
var baseModel = require('./baseModel');
var errorHandler = require('../helpers/errorHelper');
var ev = require('express-validator').validator;

var register = _.extend(baseModel);

var validateData = function(userData) {
  var checkMail = ev.isEmail(userData['email']);
  var checkFirstName = ev.isAlpha(userData['firstName']);
  var checkLastName = ev.isAlpha(userData['lastName']);
  var checkPosition = !ev.isEmpty(userData['position']);
  var valid = false;
  if (checkMail && checkFirstName && checkLastName && checkPosition) valid = true;
  return valid;
}

// register function
register.register = function(model, user, callback) {
  var userData = user;
  userData.email = userData['email'].toLowerCase();
  console.log(validateData(userData));
  if (!validateData(userData)) {
    errorHandler('Data is not valid', callback, null);
  } else {
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
}

module.exports = register;
