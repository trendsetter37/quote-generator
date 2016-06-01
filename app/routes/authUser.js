var mongoose = require('../models/db'),
    bcrypt = require('bcrypt'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user').User;

const FIVE_MIN = 60 * 5;
const DAY = 60 * 60 * 24;
const WEEK = DAY * 7;
const MILLI = 1000;

var userAuth = function (req, res) {
  var method = req.method;
  var user = req.body.user;
  var pass = req.body.pass;
  var status = res.statusCode;
  console.log('req method: ' + method);

  if ('POST' !== method)
    res.json({msg: 'POST method must be used for /authenticate endpoint.'})

  User.findOne({'user': user})
    .exec(function(err, doc) {
      if (err) {
        res.json({err: err});
      }

      if (doc) {
        var authenticated = bcrypt.compareSync(pass, doc.pass);
        if(authenticated) {
          // TODO(@jsullivan): Add in extra permissions functionality
          var token = fetchToken(doc.user);
          res.json({ 'token': token, 'msg': 'Successful auth' });
        } else {
          res.json({ 'msg': 'Incorrect password.' });
        }
      } else {
        res.json({'msg': 'User: ' + user + ' not found.'});
      }
  });
};

/**
 * Convert Date's millisecond output to seconds.
 *
 * @return {integer} seconds
 */
var currentTime = function() {
  return Date.now() / MILLI;
};

/**
 * Fetch token after validating credentials.
 *
 * @param  {object} user contains user information
 * @return {string}      signed token
 */
var fetchToken = function(user, permissions) {

  var signingKey = config.secret;
  var claims = {
    iss: 'tesla-quote-generator',
    exp: currentTime() + FIVE_MIN,
    sub: user,
    scope: ['read']
  };

  // If there are extra permissions for user add them to scope array
  if (permissions) {
    for(var val of permissions) {
      claims.scope.push(val);
    }
  }

  return jwt.sign(claims, config.secret);
};

module.exports = userAuth;
