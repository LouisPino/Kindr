import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import { getChallenges } from "../../utilities/challenge-service";
import ChallengeList from "../../components/Challenges/ChallengeList";


import "./dashboard.css"
import DailyChallenge from "../../components/Challenges/DailyChallenge";

export default function Dashboard() {
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
      setUserData(retrievedUserData)
    }  
    fillUserObj()
  }
    else{
      console.log('hit')
      navigate('/')}
  }, [])

  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const userData = await findUserByEmail(user.email);
        await handleRequest();
      }
      fillUserObj();
    } else {
      navigate("/");
    }
  }, []);


  async function handleRequest() {
    const challengeResponse = await getChallenges();

    if (challengeResponse.length) {
      setChallenges(challengeResponse);
    } else {
      console.log(challengeResponse);
      // context update for error handling might be called
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
      <h1>LOADING</h1>
    </>
  ) : (
    <>
      <h1 className="dashboard-h1">{userData.username ? `${userData.username}'s` : 'Your'} Challenge Dashboard</h1>
      <DailyChallenge dailyChallenge = {dailyChallenge}/>
      <ChallengeList challenges={challenges} location={'dashboard'}/>
    </>
  );
}
