import { useParams } from "react-router"
import { findChallengesByIds } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
export default function ShowChallenge() {
const { id } = useParams()
const [challenge, setChallenge] = useState({})

useEffect(()=>{
   async function getChallenge(){
const ids = [id]
const gotChallenge = await findChallengesByIds(ids)
setChallenge(gotChallenge[0])
   }
   getChallenge()
},[])

    return (
    <div className="challenge-block" key={challenge._id}>
    <img
      className="challenge-picture"
      src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1692365554/bebpthuftxhz18roqbwl.png"
    />
    <h3 className="h3-challenge h3-header kindr-header">
      {challenge.title}
    </h3>
    <p className="challenge-descr body-font">{challenge.description}</p>
    {/* <p className="challenge-complete body-font">Completed?</p> */}
    {/* <button name="completedChallenges" id={challenge._id} onClick={addComplete}>
      &#10003;
    </button> */}
  </div>
    )
}