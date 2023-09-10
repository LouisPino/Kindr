const { Challenge } = require("../models");


const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
module.exports = {
  create,
  index,
  show,
  update,
  delete: destroy,
  createDailyChallenge,
  findChallengesByIds
  // updateChallenge
};

async function create(req, res) {
  try {
    console.log("hit me");
    res.status(201).json(await Challenge.create(req.body));
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
    console.log("hit show control");
    res.status(200).json(await Challenge.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  console.log('req.body', req.body)
  console.log('reqparamsid', req.params.id)
  try {
    res
      .status(200)
      .json(
        await Challenge.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
      );
  } catch (error) {
    console.log('errormessage', error.message)
    res.status(400).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    console.log("hit delete control");
    res.status(200).json(await Challenge.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  async function createDailyChallenge(req, res, next) {
    const allChallenges = await res.json(await Challenge.find())
    let gptConfig = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            `Generate a good deed that someone could achieve in less than 24 hours. Please come up with a title for the deed and a description no longer than 4 sentences explaining what the deed is. Do not repeat a deed you have done before - ${allChallenges}. Deed titles should be 3 words or less. It should be formatted like this: (Deed Title): (Deed Description).` ,
        },
      ],
      temperature: 0.7,
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(gptConfig),
        }
      );
      const resFormat = await response.json();
      const message = resFormat.choices[0].message;
      const dailyDeed = message.content;
      const splitEm = dailyDeed.split(": ");
      const deedObj = {
        title: splitEm[0],
        description: splitEm[1],
        daily: true,
        category: 5,
        username: "Kindr Daily Challenge"
      };
      const oldDaily = await Challenge.findOneAndUpdate(
        { daily: true },
        { daily: false }
      );
      await Challenge.create(deedObj);
    } catch (err) {
      console.log("err", err);
      // res.status(400).json({ error: err.message });
    }
  }

  let lastDate = 0
  let currentDate = 0
  
  setInterval(()=>{
    lastDate = currentDate
    today = new Date
    todayString = today.toLocaleDateString()
    date = todayString.split('/')[1]
    currentDate = date
    console.log(lastDate, currentDate)
      if(lastDate !== currentDate){
        createDailyChallenge()
      }
    }, 1000*60*15)

async function findChallengesByIds(req, res) {
  try {
    res.status(200).json(await Challenge.find({ _id: { $in: req.body } }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// async function updateUser(req, res){
//   try {
//     res.status(201).json(await User.findOneAndUpdate({email: req.body.email}, {...req.body}));
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }