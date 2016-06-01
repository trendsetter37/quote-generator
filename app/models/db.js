var mongoose = require('mongoose');
const config = require('config');
const DB_URI = config.db.uri;
const OPTS = {
	"user": config.db.user,
	"pass": config.db.pass,
	"auth": config.db.auth
};

// connect to db
mongoose.connect(DB_URI, OPTS);
module.exports = mongoose; 
