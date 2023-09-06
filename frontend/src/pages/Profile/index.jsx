import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import("./profile.css");

export default function Welcome() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  console.log(user);

  return (
    <>
    {!isLoading && user.given_name && (
      <section className="profile-page">
        <img
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1693252945/Laurie_xewfk0.jpg"
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
  );
}
