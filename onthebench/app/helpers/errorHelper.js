var baseModel = require('../models/baseModel');

var errorHandler = function (message, callback, err) {
  baseModel.set('message', { text: err ? err : message });
  return callback(true);
}

module.exports = errorHandler;
