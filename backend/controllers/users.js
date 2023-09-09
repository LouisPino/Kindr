const { User } = require("../models");

module.exports={
addUser,
findUserByEmail,
updateUser,
findUsersByCompletedChalleneges,
uploadPhoto
}

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");

cloudinary.config(clConfig);

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

async function uploadPhoto(req, res){
  try {
    let response = await streamUpload(req);
return response
}catch(err) {
  console.log(err);
  next(Error(err));
}
}



function streamUpload(req) {
  return new Promise(function (resolve, reject) {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
}