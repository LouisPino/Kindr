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
  console.log(response)
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

  export async function createDailyChallenge() {
    const res = await fetch(`${BASE_URL}/challenges/daily`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
    });
  
    // console.log(res);
  
    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
  }
  export async function findChallengesByIds(challengesArr) {
    const res = await fetch(`${BASE_URL}/challenges/findbyid`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      body: JSON.stringify(challengesArr)
    });
    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
  }

  export async function updateChallenge(data){
    const response = await fetch(`${BASE_URL}/challenges/${data._id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
        body: JSON.stringify(data)
    });
    if(response.ok){
        return response.json()
    }else{
        return new Error("Invalid Request")
    }
}