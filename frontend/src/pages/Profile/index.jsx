import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import { findChallengesByIds } from "../../utilities/challenge-service";
import ChallengeList from "../../components/Challenges/ChallengeList"
import("./profile.css");


export default function Profile() {
  const { user } = useAuth0();
const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()
const [challengeObjs, setChallengeObjs] = useState([])
const [userData, setUserData] = useState({})
  useEffect(()=>{
    if(user){
    async function fillUserObj(){
      const retrievedUserData = await findUserByEmail(user.email)
      setUserData(retrievedUserData)
    }
    fillUserObj()
  }
else{
  navigate('/')
}
  }, [])

  useEffect(()=>{
    async function getChallengesByIds(){
    const gotChallenges =  await findChallengesByIds(userData.completedChallenges)
    setChallengeObjs(gotChallenges)
    console.log("IN GET CHALLENGESBIDS")
    }
    getChallengesByIds()
  }, [userData])

  useEffect(()=>{
    console.log("CHALLENGE OBJS", challengeObjs)
    setIsLoading(false)
  }, [challengeObjs])
  
  



if(userData && !isLoading){
  return (
    <>
      <section className="profile-page">
        <img
          src={userData?.picture}
          className="user-picture"
        />
    <Link to={"/newuser"}>
            {" "}
            <button>EDIT PROFILE</button>{" "}
          </Link>
        <h2 className="h2-header kindr-header">{userData.username ? `${userData.username}'s` : 'Your'} Deeds</h2>
        {/* <h3 className="h3-header kindr-header">Completed</h3> */}
        <h3 className="h3-header kindr-header white">Good Deed Score: {userData.score}</h3>
       {challengeObjs?.length ? <ChallengeList challenges={challengeObjs} location="profile"/> : <h1 className="white">Get deedin'!</h1>} 
      </section>
    </>
  );}else{
    return <h1 className="loading">LOADING...</h1>
  }

}