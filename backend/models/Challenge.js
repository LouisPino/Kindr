const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: String,
    caption: String,
    userId: String,
    username: String,
    challengeId: String,
})


const challengeSchema = new Schema({
  text: String,
  images: {type:[Schema.Types.ObjectId], ref: "Image"},
  challengeStart: Date,
  challengeEnd: Date,
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);

