import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import { getChallenges } from "../../utilities/challenge-service";
import ChallengeList from "../../components/Challenges/ChallengeList";


import "./dashboard.css"
import DailyChallenge from "../../components/Challenges/DailyChallenge";

export default function Dashboard({setNavScore}) {
  const { user } = useAuth0();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState();


  const [userData, setUserData] = useState({})
  
  useEffect(()=>{
    console.log(user)
    if(user){
    async function fillUserObj(){
       const retrievedUserData = await findUserByEmail(user.email)
      setNavScore(retrievedUserData.score)
      setUserData(retrievedUserData)
      await handleRequest();
    }  
    fillUserObj()
  }
    else{
      console.log('hit')
      navigate('/')}
  }, [])



  async function handleRequest() {
    const challengeResponse = await getChallenges();

    if (challengeResponse.length) {
      setChallenges(challengeResponse);
    } else {
      console.log(challengeResponse);
    }
  }
  useEffect(() => {
    if (challenges) {
      const dailyidx = challenges.findIndex((chal)=>chal.daily === true)
      setDailyChallenge(challenges[dailyidx])
      setIsLoading(false);
    } 
  }, [challenges]);

  

  return isLoading ? (
    <>
      <h1 className="loading">LOADING...</h1>
    </>
  ) : (
    <>
      <h1 className="dashboard-h1">{userData.username ? `${userData.username}'s` : 'Your'} Deed Dashboard</h1>
      <DailyChallenge dailyChallenge = {dailyChallenge} setNavScore={setNavScore} userData={userData} setUserData={setUserData}/>
      <ChallengeList challenges={challenges} location={'dashboard'} setNavScore={setNavScore} userData={userData} setUserData={setUserData}/>
    </>
  );
}
