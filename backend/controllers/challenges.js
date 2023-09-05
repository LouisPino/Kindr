const { Challenge } = require("../models");


module.exports = {
  create,
  index,
  show,
  update,
  delete: destroy,
};

async function create(req, res) {
  try {
    // res.status(201).json(await Challenge.create(req.body));
    res.send('hit me')
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function index(req, res) {
  try {
    res.status(200).json(await Challenge.find());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    console.log('hit show control')
    res.status(200).json(await Challenge.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
res.status(200).json(await Challenge.findByIdAndUpdate(req.params.id, req.body, {new: true}))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    console.log('hit delete control')
    res.status(200).json(await Challenge.findByIdAndDelete(req.params.id))
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
