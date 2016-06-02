var router = require('express').Router();
    quote = require('../models/quote'),
    QuoteSchema = quote.QuoteSchema,
    Quote = quote.Quote,
    RandomQuote = quote.RandomQuote,
    perms = require('./permissionMiddleware'),
    checkDel = perms.checkDel,
    checkWrite = perms.checkWrite;


  /*
  	Route 													http verb		description
  	====================						=========		============
  	/api/tesla/quotes/random 					GET 			Get random quote from db
  	/api/tesla/quotes									GET 			Get all the quotes
  	/api/tesla/quotes 								POST 			Create a quote
  	/api/tesla/quotes/:quote_id				GET				Get single quote by id
  	/api/tesla/quotes/:quote_id  			PUT 			Update a quote with new info
  	/api/tesla/quotes/:quote_id    		DELETE 		Delete a quote
  */

router.route('/quotes')
	.get(function(req, res) {
		Quote.find({}, function(err, results) {
			if (err) {
				console.err(err);
        res.json(err);
      } else {
        res.json(results);
      }
		});
	})
	.post(checkWrite, function(req, res) {
		var quote = new Quote();

		quote.author = req.body.author;
		quote.quote_id = randomSixFig();
		quote.quote = req.body.quote;
		quote.save(function(err){
			if (err) {
				res.json({'err':err});
      } else {
          res.json({ msg: 'Quote created!', quote: quote });
      }
		});
	});

router.route('/quotes/random')
	.get(function(req, res) {
		RandomQuote.findOneRandom(function(err, result){
			if (err)
				res.json({'err':err});
			res.json(result);
		});
	});

router.route('/quotes/:quote_id')
	.get(function(req, res) {
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result){
			if (err) {
				res.json({'err':err});
      } else if (null === result) {
				res.json({'err':'Quote ' + req.params.quote_id + ' Does not exist'});
      } else {
          res.json(result);
      }
		});
	})
	.put(checkWrite, function(req, res) {

		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result) {
			if (err)
				res.send(err);
			if (null === result)
				res.json({'err':'Quote ' + req.params.quote_id + ' Does not exist'});

			for (thing in req.body) {
				result[thing] = req.body[thing];
			}
			result.save(function(err){
				if (err) {
					res.json({'err':err});
        } else {
          res.json({msg: 'Quote Updated!'});
        }
			});
		});
	})
	.delete(checkDel, function(req, res) {
		Quote.remove({'quote_id':req.params.quote_id}, function(err, result) {
			if (err) {
				res.json({'err':err});
      } else {
        res.json({'message':'Deleted Quote'});
      }
		});
	});

/**
 * Generate random 6 digit string. Not exposed to public API.
 *
 * @return {integer}
 */
var randomSixFig = function() {
  return Math.floor(Math.random() * 1000000);
};

module.exports = router;
