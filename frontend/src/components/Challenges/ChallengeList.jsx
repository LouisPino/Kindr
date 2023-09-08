import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../utilities/user-service";
import { updateUser } from "../../utilities/user-service";

export default function ChallengeList({ challenges, location }) {
let sortedChallenges = []
let sortedChallengesidx = 0
for(let i = challenges.length-1; i>=0; i--){
sortedChallenges[sortedChallengesidx]=challenges[i]
sortedChallengesidx ++
}




 function showCondition(challenge){
   if(location === 'profile'){
    return !!userData
 }else{
  return (!challenge.daily && userData)
 }
}




  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const retrievedUserData = await findUserByEmail(user.email);
        setUserData(retrievedUserData);
      }
      fillUserObj();
    } else {
      navigate("/");
    }
  }, []);

  
  async function addComplete(e) {
    e.preventDefault()
    let userChallenges = userData.completedChallenges

    userChallenges.push(e.target.id)

    const newUserData = {...userData, [e.target.name]: userChallenges, score: userData.score+1}
    console.log('newUserData', newUserData)

    updateUser(newUserData)
    setUserData(newUserData)
    console.log('user', user)
  }
  
  useEffect(() => {
    setIsLoading(false);
  }, [userData]);

  return isLoading ? (
    <>
    <h1>LOADING</h1>
    </>
      ) : 
      (
        <>
    <section className="challenge-list">
      {sortedChallenges.map((challenge, idx) => {


      if(showCondition(challenge))  {
    return    <div className="challenge-block" key={challenge._id}>
          <img
            className="challenge-picture"
            src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1692365554/bebpthuftxhz18roqbwl.png"
          />
          <h3 className="h3-challenge h3-header kindr-header">
            {challenge.title}
          </h3>
          <p className="challenge-descr body-font">{challenge.description}</p>
          {!userData?.completedChallenges?.includes(challenge._id) ? <>
          <p className="challenge-complete body-font">Completed?</p>
          <button name="completedChallenges" id={challenge._id} onClick={addComplete}>
            &#10003;
          </button>
          </> :
          <>
          {location !== "profile" && <h1>YOU DID IT ALREADY</h1>}
          </>
      }
      <button onClick={()=> navigate(`/challenges/${challenge._id}`)}>VIEW CHALLENGE</button>
        </div>
          }  })}
    </section>
    </>
  );
}
