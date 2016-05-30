/* Deprecated, only used for initial loading of quotes */

var mongoose = require('mongoose').connect('mongodb://localhost/quotes'),
    Quote = require('./app/models/quote').Quote,
    x     = require('x-ray')(),
    url   = 'http://www.teslauniverse.com/nikola-tesla/quotes';

// CSS Paths
var authorCSSPath = 'div.field.field-name-field-quote-author.field-type-taxonomy-term-reference.field-label-hidden > div > div > a';
var pagination = 'div.pager-wrapper > ul > li.pager-next > a@href';

x(url, '.node-quote', [{
	quote: 'p',
	author: authorCSSPath,
	number: 'header>h3>a'
}]).paginate(pagination)(function(err, obj) {
	obj.forEach(function(listing){
		/* Push to db */

		Quote.create({
			quote_id: parseInt(listing.number.split(' ')[1], 10),
			quote 	: listing.quote,
			author  : listing.author
		}, function(err, todo){
			if(err)
				console.log(err);
			else
				console.log(todo);
		});

	});
});
