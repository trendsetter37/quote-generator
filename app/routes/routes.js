// app/routes/routes.js

var express = require('express'),
	router = express.Router(),
	authMiddleware = require('./authMiddleware'),
	authUser = require('./authUser');

router.use('/authenticate', authUser);
router.use(authMiddleware);


module.exports = router;
