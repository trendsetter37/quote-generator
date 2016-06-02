var bcrypt = require('bcrypt'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user').User;

const FIVE_MIN = 60 * 5;
const DAY = 60 * 60 * 24;
const WEEK = DAY * 7;
const MILLI = 1000;

/**
 * Authenticate user. Credentials should be passed using the body of a POST
 * request.
 *
 * @param  {object} req request object
 * @param  {object} res response object
 * @return {json}       Does not return a value but will send an informative
 *                      json response to client.
 */
var userAuth = function (req, res) {
  var method = req.method;
  var user = req.body.user;
  var pass = req.body.pass;

  if ('POST' !== method)
    res.json({msg: 'POST method must be used for /api/authenticate endpoint.'});

  User.findOne({'user': user})
    .exec(function(err, doc) {
      if (err) {
        res.json({err: err});
      }

      if (doc) {
        var authenticated = bcrypt.compareSync(pass, doc.pass);
        if(authenticated) {
          // TODO(@jsullivan): Add in extra permissions functionality
          var token = fetchToken(doc.user, doc.permissions);
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
 * Returns current date since Unix epoch in seconds.
 *
 * @return {integer} seconds
 */
var currentTime = function() {
  return Date.now() / MILLI;
};

/**
 * Fetch token after validating credentials.
 *
 * @param  {string} user          username for client device or site
 * @param  {array}  permissions   list of desired permissions for client
 * @return {string}               signed token
 */
var fetchToken = function(user, permissions) {

  var signingKey = config.secret;
  var claims = {
    iss: 'tesla-quote-generator',
    exp: currentTime() + FIVE_MIN,
    sub: user,
    scope: []
  };

  // If there are extra permissions for user add them to scope array
  if (permissions) {
    claims.scope = permissions;
  }

  return jwt.sign(claims, config.secret);
};

module.exports = userAuth;
