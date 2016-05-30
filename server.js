// server.js
var app = require('express')(),
  config = require('config'),
	bodyParser = require('body-parser'),
	router = require('./app/routes/routes'),
	morgan = require('morgan'),
	jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const PORT = config.port || 3000;
const DB_URI = config.db.uri;
const OPTS = {
	"user": config.db.user,
	"pass": config.db.pass,
	"auth": config.db.auth
};

// connect to db
mongoose = require('./app/models/quote')
	.mongoose.connect(DB_URI, OPTS);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('secret', config.secret);

// Route registry
app.use('/api', router);

// Starting server
var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server running at http://%s:%s', host, port);
});
