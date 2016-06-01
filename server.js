// server.js
var app = require('express')(),
  config = require('config'),
	bodyParser = require('body-parser'),
	router = require('./app/routes/routes'),
	morgan = require('morgan');

const PORT = config.port || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', router);

// Starting server
var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server running at http://%s:%s', host, port);
});
