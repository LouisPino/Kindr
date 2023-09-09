const mongoose = require('mongoose');
const { User } = require('.');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: String,
    caption: String,
    userId: String,
    username: String,
    challengeId: String
})


const challengeSchema = new Schema({
  title: {String, required: false},
  description: {String, required: false},
  images: {type:[Schema.Types.ObjectId], ref: "Image"},
  daily: {Boolean, required: false},
  category: {Number, required: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);

