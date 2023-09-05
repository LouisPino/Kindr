const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  user_id: String,
  family_name: String,
  given_name: String,
  name: String,
  picture: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);


