import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import("./profile.css");

export default function Profile() {
  const { loginWithRedirect, logout, user} = useAuth0();
const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()

  useEffect(()=>{
    if(user){
    async function fillUserObj(){
      const userData = await findUserByEmail(user.email)
    }
    fillUserObj()
    setIsLoading(false)
  }
else{
  navigate('/')
}
  }, [])

if(user && !isLoading){
  return (
    <>
    {!isLoading && user.given_name && (
      <section className="profile-page">
        <img
          src={user?.picture}
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">{user.given_name}'s Deeds</h2>
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
    )
}
{!isLoading && !user.given_name && (
      <section className="profile-page">
        <img
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1693252945/Laurie_xewfk0.jpg"
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">Your Deeds</h2>
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
    )
}
    </>
  );}else{
    return <h1>LOADING</h1>
  }

}