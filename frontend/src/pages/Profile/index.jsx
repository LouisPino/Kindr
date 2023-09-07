import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import("./profile.css");

export default function Profile() {
  const { loginWithRedirect, logout, user} = useAuth0();
const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()
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

console.log('uuuser', userData)
  useEffect(()=>{
    setIsLoading(false)
    }, [userData])
    

if(userData && !isLoading){
  return (
    <>
      <section className="profile-page">
        <img
          src={userData?.picture}
          className="user-picture"
        />
        {console.log('userdatea', userData.name)}
        <h2 className="h2-header kindr-header">{userData.username ? `${userData.username}'s` : 'Your'} Deeds</h2>
        <h3 className="h3-header kindr-header">Completed</h3>
        <ul className="user-deed-list">
          <li>lafjkawe</li>
          <li>lafjkawe</li>
          <li>lafjkawe</li>
          <li>lafjkawe</li>
        </ul>
        <h3 className="user-h3 kindr-header">Saved</h3>
        <ul className="user-deed-list">
          <li>lafjkawe</li>
          <li>lafjkawe</li>
          <li>lafjkawe</li>
          <li>lafjkawe</li>
        </ul>
        {/* <img src={user.picture}/> */}
        {/* <p>{user.given_name} {user.family_name || user.email.split("@")[0]} is a loser.</p> */}
      </section>
    </>
  );}else{
    return <h1>LOADING</h1>
  }

}