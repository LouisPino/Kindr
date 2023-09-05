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
  title: String,
  description: String,
  images: {type:[Schema.Types.ObjectId], ref: "Image"},
  startDate: Date,
  endDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', userSchema);

