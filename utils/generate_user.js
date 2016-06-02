/* module to generate passwords for user authentication */
var bcrypt = require('bcrypt');
var config = require('config');
var mongoose = require('../app/models/db');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  'user': String,
  'pass': String,
  'permissions': Array
}, {collection: 'users'});
var User = mongoose.model('User', UserSchema);


/**
 * Takes credentials and optional permissions parameter and creates api user
 *
 * @param  {string} user
 * @param  {string} pass        hash
 * @param  {array} permissions  Array of strings. e.g. ['read', 'write', 'delete']
 * @return {boolean}            Did we create a user?
 */
var makeUser = function(user, pass, permissions) {
  var hash = bcrypt.hashSync(pass, 10);
  var user = new User({
    'user': user,
    'pass': hash,
  });

  user.permissions = permissions? permissions : ['read']

  user.save(function(err, user) {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
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
