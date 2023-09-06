const BASE_URL= process.env.REACT_APP_BASE_URL
console.log(BASE_URL)

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