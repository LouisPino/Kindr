const BASE_URL= process.env.REACT_APP_BASE_URL

export async function create(data){
    const response = await fetch(BASE_URL, {
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