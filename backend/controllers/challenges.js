const Challenge = require("../models/Challenge");

module.exports = {
    show
};

async function show(req, res) {
  console.log("hit");
  try {
    res.status(200).json(await Challenge.findById(req.params.cid));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
