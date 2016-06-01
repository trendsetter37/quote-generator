var mongoose = require('./db');
var Schema = mongoose.Schema,
    UserSchema = new Schema({
      user: String,
      pass: String
    }, { collection: 'users' });

module.exports = {
  UserSchema: UserSchema,
  User: mongoose.model('User', UserSchema)
};
