/* module used to auth user and return token */
var authMiddleware = require('express').Router(),
    auth = require('./auth'),
    endpoints = require('./endpoints');

authMiddleware.use(auth);
authMiddleware.use('/tesla', endpoints);

module.exports = authMiddleware;
