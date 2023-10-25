const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    user_id: String,
    name: String,
    picture: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
    },
  },
    completedChallenges: { type: [Schema.Types.ObjectId], ref: "Challenge" },
    score: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
