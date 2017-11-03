var errorHandler = function (message, callback, err) {
  var message = {
    message : {
      text: err ? err._message : message
    }
  }
  callback(message);
}

module.exports = errorHandler;
