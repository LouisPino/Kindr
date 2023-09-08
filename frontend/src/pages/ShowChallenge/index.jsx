import { useParams } from "react-router"

export default function ShowChallenge() {
const { id } = useParams()

    return <h1>CHALLENGE # {id} </h1>
    
}