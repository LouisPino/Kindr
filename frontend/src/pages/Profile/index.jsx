import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import { findChallengesByIds } from "../../utilities/challenge-service";
import ChallengeList from "../../components/Challenges/ChallengeList"
import("./profile.css");


export default function Profile({ setOpen}) {
  const { user } = useAuth0();
const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()
const [challengeObjs, setChallengeObjs] = useState(null)
const [userData, setUserData] = useState({})
  useEffect(()=>{
    if(user){
    async function fillUserObj(){
      const retrievedUserData = await findUserByEmail(user.email)
      setUserData(retrievedUserData)
    }
    fillUserObj()
    setOpen(false)
  }
else{
  navigate('/')
}
  }, [])

  useEffect(()=>{
    if(userData.completedChallenges){
    async function getChallengesByIds(){
    const gotChallenges =  await findChallengesByIds(userData.completedChallenges)
    setChallengeObjs(gotChallenges)
    }
    getChallengesByIds()
  }
  }, [userData])

  useEffect(()=>{
    console.log("CHALLENGE OBJS", challengeObjs)
    if(challengeObjs){
    setIsLoading(false)
    }
  }, [challengeObjs])
  
  



if(userData && !isLoading){
  return (
      <section className="profile-page">
        <img
          src={userData?.picture}
          className="user-picture"
        />
    <Link to={"/newuser"}>
            <button className={"viewchallenge-button body-font edit-profile"}>EDIT PROFILE</button>
          </Link>
        <h3 className="h3-header kindr-header white">Good Deed Score: {userData.score}</h3>
        <h2 className="profile-deeds h2-header kindr-header">{userData.username ? `${userData.username}'s` : 'Your'} Deeds</h2>
       <hr />
       {challengeObjs?.length ? <ChallengeList challenges={challengeObjs} location="profile" userData={userData} setUserData={setUserData}/> : <h1 className="white">Get deedin'!</h1>} 
      </section>
  );}else{
    return (
      <>
    <h1 className="loading">LOADING...</h1>
    <img src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694439817/loading-animation_nerskz.gif" alt="" />
    </>)
  }

}