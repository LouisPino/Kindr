const { Challenge } = require("../models");
console.log(Challenge)

module.exports = {
  create,  
  show
};


async function create(req, res) {
  console.log(req.body)
  try {
    res.status(201).json(await Challenge.create(req.body));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function show(req, res) {
  console.log("hit");
  try {
    res.status(200).json(await Challenge.findById(req.params.cid));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
