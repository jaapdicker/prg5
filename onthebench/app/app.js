"use strict"
// Includes

var express = require('express');
var session = require('cookie-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var baseModel = require('./models/baseModel');

// var expressValidator = require('express-validator');

// create app
var app = express();

// Configs
app.set('case sensitive routing', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'session',
  keys: ['on', 'the', 'bench'],
  maxAge: 24*60*60*1000
}));

// Routes
app.use(require('./filldb'));
app.use(require('./controllers/login'));
app.use(require('./controllers/logout'));
app.use(require('./controllers/register'));

// checked if logged in
app.use(function(req, res, next) {
  if(!req.session.data || !req.session.data.loggedIn) {
    res.redirect('/login');
  }
  next();
});

app.use(require('./controllers/dashboard'));
app.use(require('./controllers/profile'));
app.use(require('./controllers/event'));
app.use(require('./controllers/club'));
app.use(require('./controllers/team'));
app.use(require('./controllers/clubCreate'));
app.use(require('./controllers/divisionCreate'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
