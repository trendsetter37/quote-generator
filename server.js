// server.js
var app = require('express')(),
	bodyParser = require('body-parser'),
	router = require('./app/routes/routes'),
	mongoose = require('./app/models/quote').mongoose.connect('mongodb://localhost/quotes');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9090;

// Route registry
app.use('/api', router);

// Starting serve
app.listen(port);
console.log('Running on port ' + port);