import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "../../components/Nav/sidebar";

import("./welcome.css");

export default function Welcome() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
const navigate = useNavigate()
if(user){
navigate("/dashboard")
}

  return (
    <>
      <section className="welcome-page">
        <h2 className="h2-header kindr-header">Welcome!</h2>
        <p className="body-font welcome-emphasize">
          We're so glad you're here.
        </p>
        <p className="body-font welcome-body">
          Kindr is an app where you can do good things and inspire others to do
          good. We're just a bunch of do-gooders 'round these parts.
        </p>

        <button onClick={() => loginWithRedirect()}>LOGIN</button>

      </section>
    </>
  );
}
