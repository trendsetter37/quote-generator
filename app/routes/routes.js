// app/routes/routes.js

var express = require('express'),
	router = express.Router(),
	modelTools = require('../models/quote'),
	random = require('mongoose-simple-random'),
	QuoteSchema = modelTools.QuoteSchema,
	Quote = modelTools.Quote,
	RandomQuote = modelTools.mongoose.model('RandomQuote', QuoteSchema.plugin(random));

router.use(function(req, res, next){
  // some logging or could check authentication etc.
  res.set('Access-Control-Allow-Origin', '*');

  // Disable DELETE, PUT & POST request for now
  if ('GET' === req.method) {
  	console.log('Received request @ ' + new Date());
  	next();
  }
  else {
  	console.log('Blocked an inappropriate request : ' + new Date());
  	res.json({
  		author: 'Javis',
  		quote_id: 0,
  		quote: req.method + ' requests to this API have been disabled for obvious reasons.'
  	});
  }
  
});

/*
	Route 					http verb		description
	====================	=========		============
	/api/tesla/quotes		GET 			Get all the quotes
	/api/tesla/quotes 		POST 			Create a quote
	/api/tesla/:quote_id 	GET 			Get a single quote
	/api/tesla/:quote_id  	PUT 			Update a quote with new info
	/api/tesla/:quote_id    DELETE 			Delete a quote
	/api/tesla/random 		GET 			Get random quote from db
*/


router.route('/tesla/quotes') //TODO
	.get(function(req, res) {
		// get all the quotes
		Quote.find({}, function(err, results) {
			if (err)
				console.err(err);	
			res.json(results);
		});
	})
	.post(function(req, res) {
		var quote = new Quote(); 	
		quote.author = req.body.author;
		quote.quote_id = req.body.quote_id; // Ensure that there is a quote_id
		quote.quote = req.body.quote;
		//console.log(quote);
		quote.save(function(err){
			if (err)
				res.json({'err':err});
			res.json({ message: 'Quote created!', quote: quote });
		})
	});

router.route('/tesla/quotes/random')
	.get(function(req, res) {
		RandomQuote.findOneRandom(function(err, result){
			if (err)
				res.json({'err':err});
			res.json(result);
		});
	});

router.route('/tesla/quotes/:quote_id')
	.get(function(req, res) {
		// get quote by quote_number
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result){
			if (err)
				res.json({'err':err});
			if (null === result)
				res.json({'err':'Quote ' + req.params.quote_id + ' Does not exist'});
			res.json(result);
		})
	})
	.put(function(req, res) {
		// update quote
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result) {
			if (err)
				res.send(err);
			if (null === result)
				res.json({'err':'Quote ' + req.params.quote_id + ' Does not exist'});
			// check to see what needs to be updated
			for (thing in req.body) {
				result[thing] = req.body[thing];
			}
			result.save(function(err){
				if (err)
					res.json({'err':err});
				res.json({'message': 'Quote Updated!'});
			});
		});
	})
	.delete(function(req, res) {
		Quote.remove({'quote_id':req.params.quote_id}, function(err, result) {
			if (err)
				res.json({'err':err});
			res.json({'message':'Deleted Quote'});
		})
	});

module.exports = router;
