// includes
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// create app
var app = express();

// configs
app.set('case sensitive routing', false);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'node_modules')));

// routes
app.use(require('./todos'));

// serve to localhost
app.listen(1337, function() {
  console.log('ready on port 1337');
});
