// app/routes/routes.js

var express = require('express'),
	router = express.Router(),
	Quote = require('../models/quote');

router.use(function(req, res, next){
  // some logging or could check authentication etc.
  console.log('Got a request');
  next(); // moving on to next routes, can't stop won't stop
});

/*
	Route 					http verb		description
	====================	=========		============
	/api/tesla/quotes		GET 			Get all the quotes
	/api/tesla/quotes 		POST 			Create a quote
	/api/tesla/:quote_id 	GET 			Get a single quote
	/api/tesla/:quote_id  	PUT 			Update a quote with new info
	/api/tesla/:quote_id    DELETE 			Delete a quote

*/
// Real routes
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
		// create a quote (accessed at POST http://localhost:8080/api/tesla/quotes)
		var quote = new Quote(); 	// create an instance of the Quote model
		quote.author = req.body.author;
		quote.quote_id = req.body.quote_id;
		quote.quote = req.body.quote;
		//console.log(quote);
		quote.save(function(err){
			if (err)
				res.send(err);
			res.json({ message: 'Quote created!', quote: quote });
		})
	});

router.route('/tesla/quotes/random')
	.get(function(req, res) {
		// tesla quotes are between 1 and 103 inclusive
		// This could be better
		var randn = Math.floor(Math.random() * (103 - 1) + 1);
		Quote.findOne({'quote_id': randn}, function(err, result) {
			if (err)
				res.json({'err':err});
			if ( null === result)
				res.json({'message': 'received null value', 'randn':randn, 'count':count});
			res.json(result);
		});
	});


router.route('/tesla/quotes/:quote_id')
	.get(function(req, res) {
		// get quote by quote_number
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result){
			if (err)
				res.send(err);
			res.json(result);
		})
	})
	.put(function(req, res) {
		// update quote
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result) {
			if (err)
				res.send(err);
			// check to see what needs to be updated
			for (thing in req.body) {
				result[thing] = req.body[thing];
			}
			result.save(function(err){
				if (err)
					res.send({'error':err});
				res.json({'message': 'Quote Updated!'});
			});
		});
	})
	.delete(function(req, res) {
		Quote.remove({'quote_id':req.params.quote_id}, function(err, result) {
			if (err)
				res.send({'err':err});
			res.json({'message':'Deleted Quote'});
		})
	});
/*
function random(){
	var quote;
	var randn;
	console.log('Entered random function');
	Quote.count({}, function(err, count){
		if (err)
			console.err(err);
		randn = Math.floor(Math.random() * (count - 1) +1)
		console.log('Random number is: ' + randn);

	});
	Quote.findOne({'quote_id': randn}, function (err, result){
		if (err)
			console.log(err);
		quote = result;
	});
	console.log(quote);
	console.log(randn);
	return quote;

} */

module.exports = router;