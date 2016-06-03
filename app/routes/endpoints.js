var router = require('express').Router();
    quote = require('../models/quote'),
    QuoteSchema = quote.QuoteSchema,
    Quote = quote.Quote,
    RandomQuote = quote.RandomQuote,
    perms = require('./permissionMiddleware'),
    checkDel = perms.checkDel,
    checkWrite = perms.checkWrite;

const SIX_DIGIT = 1000000;

router.route('/quotes')
  /**
   * @api {get} /api/tesla/quotes Request all quotes
   * @apiName GetQuotes
   * @apiVersion  1.1.0
   * @apiGroup  Gets
   *
   * @apiSuccess  {Array}  Array  List of quote objects
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
  /**
   * @api {post} /api/tesla/posts  Create quote
   * @apiName  CreateQuote
   * @apiVersion  1.1.0
   * @apiGroup  Posts
   *
   * @apiSuccess {String}  msg    Quote created
   * @apiSuccess {Object}  quote  Created quote object
   *
   * @apiSuccessExample Success-Response
   * POST /api/tesla/quotes 200
   * {
   * 	"msg": "Quote created!",
   * 	"quote": {
   * 		"_v": 0,
   * 		"quote": "Creating api docs!",
   * 		"quote_id": 339767,
   * 		"author": "Javis Sullivan",
   * 		"_id": "5750dbd6895161b24413b611"
   * 	}
   * }
   */
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
  /**
   * @api {get} /api/tesla/quotes/randome  Get random quotes
   * @apiName  RandomQuote
   * @apiVersion  1.1.0
   * @apiGroup Gets
   *
   * @apiSuccess  {String}  _id  Database ID
   * @apiSuccess  {Integer} quote_id  Quote ID
   * @apiSuccess  {String}  quote  Quote text
   * @apiSuccess  {String}  author  Author name
   *
   * @apiSuccessExample  Success-Response
   * GET /api/tesla/quotes/random
   * {
   * 	"_id": "560af6556a83bfe9094855d2",
   * 	"quote_id": 70,
   * 	"quote": ""What the result of these investigations will...",
   * 	"author": "Nikola Tesla",
   * 	"_v": 0
   * }
   */
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
  /**
   * @api {get} /api/tesla/quotes/:quote_id  Get quote by ID
   * @apiName  QuoteByID
   * @apiVersion  1.1.0
   * @apiGroup Gets
   *
   * @apiSuccess  {String}  Database ID
   * @apiSuccess  {Integer} Quote ID
   * @apiSuccess  {String}  Quote text
   * @apiSuccess  {String}  Author name
   *
   * @apiSuccessExample  Success-Response
   * GET /api/tesla/quotes/69  200
   * {
   * 	"_id": "560af6556a83bfe9094855d3",
   * 	"quote_id": 69,
   * 	"quote": "Our senses enable us to perceive only a ...",
   * 	"author": "Nikola Tesla",
   * 	"_v": 0
   * }
   */
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
  /**
   * @api {put} /api/tesla/quotes/:quote_id  Update quote by ID
   * @apiName  UpdateQuoteByID
   * @apiVersion  1.1.0
   * @apiGroup Puts
   *
   * @apiSuccess  {String}  _id  Database ID
   * @apiSuccess  {Integer} quote_id  Quote ID
   * @apiSuccess  {String}  quote  Quote text
   * @apiSuccess  {String}  author  Author name
   *
   * @apiSuccessExample  Success-Response
   * PUT /api/tesla/quotes/:quote_id  204
   *
   * @apiError  {String}  msg  Error message
   * @apiErrorExample  Error-Response
   * PUT /api/tesla/quotes/:quote_id  404
   * {
   * 	"msg": "Quote {quote_id} Does not exist"
   * }
   */
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
  /**
   * @api {delete} /api/tesla/quotes/:quote_id  Delete quote by ID
   * @apiName  DeleteQuoteByID
   * @apiVersion  1.1.0
   * @apiGroup Deletes
   *
   * @apiSuccessExample Success-Response
   * DELETE /api/tesla/quotess/:quote_id
   *
   */
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
  return Math.floor(Math.random() * SIX_DIGIT);
};

module.exports = router;
