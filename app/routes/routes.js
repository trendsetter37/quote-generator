// app/routes/routes.js

var express = require('express'),
	router = express.Router(),
	authMiddleware = require('./authMiddleware'),
	authUser = require('./authUser');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.use('/authenticate', authUser);
router.use(authMiddleware);


module.exports = router;
