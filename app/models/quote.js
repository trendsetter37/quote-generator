// app/models/quote.js

var mongoose = require('mongoose');
var QuoteSchema = mongoose.Schema({
    quote: String,
    author: String,
    quote_id: Number
},
{collection: 'tesla'});

module.exports = mongoose.model('Quote', QuoteSchema);
