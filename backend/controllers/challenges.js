const { Challenge } = require("../models");
// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
  // })
  // const openai = new OpenAIApi(configuration);
  
    const apiKey= process.env.REACT_APP_OPENAI_API_KEY
module.exports = {
  create,
  index,
  show,
  update,
  delete: destroy,
  createDailyChallenge
};

async function create(req, res) {
  try {
    console.log('hit me')
    res.status(201).json(await Challenge.create(req.body))
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

// async function createDailyChallenge(req, res, next) {
//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content:
//           'Generate a good deed that someone could achieve in less than 24 hours. Please come up with a title for the deed and a description no longer than 4 sentences explaining what the deed is. It should be formatted like this: (Deed Title): (Deed Description). Do not use the words "title" or "description".',
//       },
//     ],
//     temperature: 0.7,
//     max_tokens: 500,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });
//   const message = response.data.choices[0].message;
//   const dailyDeed = message.content;
//   const splitEm = dailyDeed.split(": ");
//   const newTitle = splitEm[0];
//   const newDeed = splitEm[1];
//   const deedObj = { title: newTitle, description: newDeed, daily: true };
//   Challenge.create(deedObj)
//   res.send(deedObj)
// }



async function createDailyChallenge(req, res, next) {
let gptConfig={
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Say this is a test!"}],
  "temperature": 0.7
}

const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  credentials: "include",
  headers: { Accept: "application/json",
  "Authorization": apiKey,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,},
  body: JSON.stringify(gptConfig)
})
res.json(response)
}