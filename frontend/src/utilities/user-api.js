const BASE_URL= process.env.REACT_APP_BASE_URL

export async function create(data){
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(response.ok){
        return response.json()
    }else{
        return new Error("Invalid Request")
    }
}

export async function findUserByEmail(userEmail){
    const res = await fetch(`${BASE_URL}/users/${userEmail}`, {
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

export async function updateUser(data){
    const response = await fetch(`${BASE_URL}/users`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
        body: JSON.stringify(data)
    })
    if(response.ok){
        return response.json()
    }else{
        return new Error("Invalid Request")
    }
}

export async function findUsersByCompletedChalleneges(challengeId){
    const res = await fetch(`${BASE_URL}/users/challenges/${challengeId}`, {
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