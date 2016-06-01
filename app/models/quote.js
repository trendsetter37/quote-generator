// app/models/quote.js

var mongoose = require('./db');
var QuoteSchema = mongoose.Schema({
    quote: String,
    author: String,
    quote_id: Number
}, {collection: 'tesla'}),
    random = require('mongoose-simple-random'),
    RandomQuote = mongoose.model('RandomQuote', QuoteSchema.plugin(random));

module.exports = {
	Quote : mongoose.model('Quote', QuoteSchema),
	QuoteSchema : QuoteSchema,
  RandomQuote : RandomQuote,
	mongoose : mongoose
};
