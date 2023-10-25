const { User } = require("../models");
const cloudinary = require("../utils/cloudinary.js");

module.exports = {
  addUser,
  findUserByEmail,
  updateUser,
  findUsersByCompletedChalleneges,
};

async function addUser(req, res) {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findUserByEmail(req, res) {
  try {
    res.status(201).json(await User.findOne({ email: req.params.email }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  const {
    username,
    email,
    user_id,
    name,
    picture,
    completedChallenges,
    score,
  } = req.body;
  try {
    console.log('body', req.body)
    const result = await cloudinary.uploader.upload(picture, {
      folder: "user_img",
      width: 300,
      crop: "scale",
    });
    res.status(201).json(
      await User.findOneAndUpdate(
        { email: req.body.email },
        {
          ...req.body,

          picture: {
            public_id: result.public_id,
            url: result.secure_url,
            // public id + url come from cloudinary
          },
        }
      )
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findUsersByCompletedChalleneges(req, res) {
  try {
    res
      .status(201)
      .json(await User.find({ completedChallenges: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
