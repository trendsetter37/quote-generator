/* module to generate passwords for user authentication */
var bcrypt = require('bcrypt');
var config = require('config');
require('../models/db');
//var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  'user': String,
  'pass': String
}, {collection: 'users'});
var User = mongoose.model('User', UserSchema);

//mongoose.connect(config.db.uri, OPTS);

var makeUser = function(user, pass) {
  var hash = bcrypt.hashSync(pass, 10);
  User.create({'user': user, 'pass': hash}, function(err, user) {
    if (err) console.log(err);
    console.log('Success: ');
    console.log(user);
  });
};

var checkUser = function(user, pass) {

  User.findOne({'user': user})
    .exec(function(err, usr) {
      result = bcrypt.compareSync(pass, usr.pass);
      console.log('Result: ' + result);

    });
};

module.exports = {
  makeUser: makeUser,
  checkUser: checkUser
};
