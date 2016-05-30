/* Test mongoose connection to hardened mongodb instance.
 * NOTE (@trendsetter37) run this file from root directory
 */
var config = require('config');
var Quote = require('../app/models/quote.js').Quote;
var mongoose = require('mongoose');
const URI = config.db.uri;
const OPTS = {
      "user": config.db.user,
      "pass": config.db.pass,
      "auth": config.db.auth
    };

// Connect to db
mongoose.connect(URI, OPTS);

// Not a true promise as per http://mongoosejs.com/docs/promises.html
Quote.findOne()
  .then(function (doc) {
    console.log(doc);
  })
  .then(function () {
    console.log('Test script complete');
    process.exit(0);
  });
