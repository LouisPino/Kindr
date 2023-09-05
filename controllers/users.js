const User = require("../models/User");

module.exports={
addUser
}

const sampleUser= {
  name: "Pino",
  email: "LJPino95@gmail.com",
  avatar: "1234asdf"
}

async function addUser(req, res){
  console.log('hit')
    try {
        res.status(201).json(await User.create(sampleUser));
        console.log(req.body)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

