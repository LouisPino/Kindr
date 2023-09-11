const BASE_URL= process.env.REACT_APP_BASE_URL

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
    if (res.ok) {
      return res.json();
    } else {
      return new Error("Invalid Request");
    }
  }

//for testing only with create daily challenge button in Daily Challenge component, daily generation happens automatically on backend
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