// server.js


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// The setup
var mongoose = require('mongoose').connect('mongodb://localhost/quotes');
var Quote = require('./app/models/quote');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Routes for api
var router = express.Router();
router.use(function(req, res, next){
  // some logging or could check authentication etc.
  console.log('Got a request');
  next(); // moving on to next routes, can't stop won't stop
});

// simple route test
router.get('/', function(req, res) {

  res.json({message: 'Test endpoint working!'});
});

// Real routes
//router.route('/quotes');//TODO

// Route registry
app.use('/api', router);

// Starting serve
app.listen(port);
console.log('Running on port ' + port);
