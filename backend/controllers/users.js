const User = require("../models/User");

module.exports={
addUser
}


async function addUser(req, res){
  console.log('hit')
    try {
        res.status(201).json(await User.create(req.body));
        console.log(req.body)
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

