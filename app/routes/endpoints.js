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
  /**
   * @api {get} /api/tesla/quotes Request all quotes
   * @apiName GetQuotes
   * @apiGroup  Quotes
   *
   * @apiSuccess  {String}  author    Quote author
   * @apiSuccess  {String}  quote_id  Quote ID
   * @apiSuccess  {String}  quote     Quote contents
   *
   * @apiSuccessExample Success-Response:
   * GET /api/tesla/quotes 200
   * [
   * 	{
   * 		"_id": "560af6556a83bfe9094855b3",
   * 		"quote_id": "101",
   * 		"quote": "One of the great events ...",
   * 		"author": "Nikola Tesla",
   * 		"__v": 0
   * 	},
   * 	{
   * 		"_id": "560af6556a83bfe9094855b2",
   * 		"quote_id": "102",
   * 		"quote": "Power can be, and at...",
   * 		"author": "Nikola Tesla",
   * 		"__v": 0
   * 	},
   * 	...
   * ]
   *
   *
   *
   */
	.get(function(req, res) {
		Quote.find({}, function(err, results) {
			if (err) {
				console.err(err);
        res.status(500).json({'err': err});
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
				res.status(500).json({'err':err});
      } else {
          res.json({ msg: 'Quote created!', quote: quote });
      }
		});
	});

router.route('/quotes/random')
	.get(function(req, res) {
		RandomQuote.findOneRandom(function(err, result){
			if (err) {
        res.status(500).json({'err':err});
      } else {
        res.json(result);
      }
		});
	});

router.route('/quotes/:quote_id')
	.get(function(req, res) {
		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result){
			if (err) {
				res.status(500).json({'err':err});
      } else if (null === result) {
				res.status(404).json({'msg':'Quote ' + req.params.quote_id + ' Does not exist'});
      } else {
          res.json(result);
      }
		});
	})
	.put(checkWrite, function(req, res) {

		Quote.findOne({'quote_id':req.params.quote_id}, function(err, result) {
			if (err) {
        res.status(500).json(err);
      } else if (null === result) {
        res.status(404).json(
          {'msg':'Quote ' + req.params.quote_id + ' Does not exist'}
        );
      } else {
        for (thing in req.body) {
          result[thing] = req.body[thing];
        }
        result.save(function(err){
  				if (err) {
  					res.status(500).json({'err':err});
          } else {
            res.sendStatus(204);
          }
  			});
      }
    });
	})
	.delete(checkDel, function(req, res) {
		Quote.remove({'quote_id':req.params.quote_id}, function(err, result) {
			if (err) {
				res.status(500).json({'err':err});
      } else {
        res.sendStatus(204);
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
