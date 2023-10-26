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
  try {
    const currentUser = await User.findById(req.params.id);
    const data = {
      username: req.body.username,
      email: req.body.email,
      user_id: req.body.user_id,
      name: req.body.name,
      completedChallenges: req.body.completedChallenges,
      score: req.body.score,
    };

    // modify image conditionally

    if (req.body.picture !== "") {
      const ImgId = currentUser.image.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.picture, {
        folder: "userimages",
        width: 300,
        crop: "scale"
      });

      data.picture = {
        public_id: newImage.public_id,
        url: newImage.secure_url
      }
    }

    const userUpdate = await User.findOneAndUpdate({ email: req.body.email }, data, {new:true})

    res.status(200).json({
      success: true,
      userUpdate
    })

  } catch (error) {
    console.log(error)
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
