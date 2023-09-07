const { User } = require("../models");

module.exports = {
  addUser,
  findUserByEmail,
  updateUser,
  findChallengesById,
};

async function addUser(req, res) {
  try {
    res.status(201).json(await User.create(req.body));
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findUserByEmail(req, res) {
  try {
    res.status(201).json(await User.findOne({ email: req.params.email }));
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  console.log(req.body);
  try {
    res
      .status(201)
      .json(
        await User.findOneAndUpdate({ email: req.body.email }, { ...req.body })
      );
    console.log("reqbody", req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function findChallengesById(req, res) {
  console.log('req.body', req.body);
  try {
    res.status(201).json(
      await User.find({
        _id: { $in: req.body },
      })
    );

    console.log("reqbody challengesIds", req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
