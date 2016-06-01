var router = require('express').Router(),
    config = require('config'),
    jwt = require('jsonwebtoken');


/**
 * User authentication.
 *
 * The authUser middleware will check a given token for validity.
 * Each api request will need the x-Auth-token header set to a valid token (jwt)
 * for successful authentication.
 *
 * @param  {object}    request
 * @param  {object}    response
 * @param  {Function}  passes on to next middleware function
 * @return {json}      returns token or indicates an error.
 */
var authFunc = function (req, res, next) {
    var token = req.get('x-Auth-token');
    var decodedToken = checkToken(token);
    var sub = decodedToken.sub;
    var iss = decodedToken.iss;

    if (iss && iss === 'tesla-quote-generator' && sub) {
      next();
    } else {
      res.json({ 'msg': 'Not authenticated.' });
    }
};

/**
 * Check if valid token was issued from client.
 *
 * @param  {string} token [signed jwt]
 * @return {object}       [returns decoded token or err object]
 */
var checkToken =  function(token) {
  var decoded;
  try {
    decoded = jwt.verify(token, config.secret);
    return decoded;
  } catch (err) {
    return err;
  }
};

module.exports = authFunc;
