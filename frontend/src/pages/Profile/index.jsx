import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import("./profile.css");

export default function Profile() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  console.log(user);

  useEffect(()=>{
    async function fillUserObj(){
      const userData = await findUserByEmail(user.email)
    }
fillUserObj()
  }, [])

  return (
    <>
      <section className="profile-page">
        <img
          src={user.picture}
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">USER's Deeds</h2>
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
  );
}
