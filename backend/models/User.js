const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  user_id: String,
  name: String,
  picture: String,
  completedChallenges: {type:[Schema.Types.ObjectId], ref: "Challenge"},
  score: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);


