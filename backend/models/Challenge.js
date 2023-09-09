const mongoose = require('mongoose');
const { User } = require('.');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: String,
    userId: String,
    username: String,
    challengeId: String
})


const challengeSchema = new Schema({
  title: String,
  description: String,
  images: [imagesSchema],
  daily: Boolean,
  category: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);

