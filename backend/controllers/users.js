const User = require("../models/User");

module.exports={
addUser
}

async function addUser(req, res){
    try {
        res.status(201).json(await User.create({name: "Pino"}));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}