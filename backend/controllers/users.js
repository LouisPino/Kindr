const { User } = require("../models");

module.exports={
addUser,
findUserByEmail,
updateUser,
findUsersByCompletedChalleneges,
uploadPicture
}


async function addUser(req, res){
    try {
        res.status(201).json(await User.create(req.body));
        console.log(req.body)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}


async function findUserByEmail(req, res){
  try {
    res.status(201).json(await User.findOne({email: req.params.email}));
    console.log(req.body)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateUser(req, res){
  try {
    res.status(201).json(await User.findOneAndUpdate({email: req.body.email}, {...req.body}));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findUsersByCompletedChalleneges(req, res){
  try {
    res.status(201).json(await User.find({completedChallenges: req.params.id}));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

