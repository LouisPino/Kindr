const mongoose = require('mongoose');
const { User } = require('.');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: String,
    userId: String,
})


const challengeSchema = new Schema({
  title: String,
  description: String,
  // images: {type:[Schema.Types.ObjectId], ref: "Image"},
  images: [imagesSchema],
  daily: Boolean,
  category: Number,
  username: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);