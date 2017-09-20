var homeController = require('./controllers/homeController');

module.exports = function(app) {
  // index
  app.get('/', homeController.index);
}
