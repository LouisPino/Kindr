const BASE_URL= process.env.REACT_APP_BASE_URL
console.log(BASE_URL)

// const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export async function create(data){
  const response = await fetch(`${BASE_URL}/challenges`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,},
    body: JSON.stringify(data)
  })
    if(response.ok){
        return response.json()
    }else{
        return new Error("Invalid Request")
    }
}

export async function index() {
    const res = await fetch(`${BASE_URL}/challenges`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
    });
  
    console.log(res);
  
    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
  }

  // export async function createDailyChallenge() {
  //   const response = await openai.createChatCompletion({
  //     model: 'gpt-3.5-turbo',
  //     messages: [
  //         {
  //             role: 'system',
  //             content: 'Generate a good deed that someone could achieve in less than 24 hours. Please come up with a title for the deed and a description no longer than 4 sentences explaining what the deed is. It should be formatted like this: (Deed Title): (Deed Description). Do not use the words "title" or "description".'
  //         },
  //     ],
  //     temperature: 0.7,
  //     max_tokens: 500,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  // });
  // const message = response.data.choices[0].message
  // const dailyDeed = message.content
  // const splitEm = dailyDeed.split(': ')
  // const newTitle = splitEm[0]
  // const newDeed = splitEm[1]
  // const deedObj = {title: newTitle, description: newDeed}
  // }