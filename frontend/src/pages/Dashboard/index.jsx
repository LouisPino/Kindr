import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../utilities/user-service";
import { getChallenges } from "../../utilities/challenge-service";
import ChallengeList from "../../components/Challenges/ChallengeList";
import DailyChallenge from "../../components/Challenges/DailyChallenge";
import "./dashboard.css"

export default function Dashboard({setNavScore, setOpen}) {
  //general state
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [challenges, setChallenges] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState();
  const [userData, setUserData] = useState({})
  const navigate = useNavigate();
  
  //grab user data from db
  useEffect(()=>{
    if(user){
    async function fillUserObj(){
       const retrievedUserData = await findUserByEmail(user.email)
      setNavScore(retrievedUserData.score)
      setUserData(retrievedUserData)
      await handleRequest();
    }  
    setOpen(false)
    fillUserObj()
  }
    else{
      navigate('/')}
  }, [])


//index challenges on render
  async function handleRequest() {
    const challengeResponse = await getChallenges();
    if (challengeResponse.length) {
      setChallenges(challengeResponse);
    }
  }

  //find daily challenge, finish loading
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
      <img src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694439817/loading-animation_nerskz.gif" alt="" />
    </>
  ) : (
    <>
      <h1 className="dashboard-h1">{userData.username ? `${userData.username}'s` : 'Your'} Deed Dashboard</h1>
      <DailyChallenge dailyChallenge = {dailyChallenge} setNavScore={setNavScore} userData={userData} setUserData={setUserData}/>
      <ChallengeList challenges={challenges} location={'dashboard'} setNavScore={setNavScore} userData={userData} setUserData={setUserData}/>
    </>
  );
}
