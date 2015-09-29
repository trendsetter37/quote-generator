// server.js
var app = require('express')(),
	bodyParser = require('body-parser'),
	router = require('./app/routes/routes'),
	mongoose = require('mongoose').connect('mongodb://localhost/quotes'),
	Quote = require('./app/models/quote'); 	

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9090; // 8080 interferes with something else

// Route registry
app.use('/api', router);

// Starting serve
app.listen(port);
console.log('Running on port ' + port);
