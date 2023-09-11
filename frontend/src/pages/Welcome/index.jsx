import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "../../components/Nav/sidebar";

import("./welcome.css");

export default function Welcome() {
const { loginWithRedirect, user } = useAuth0();
const navigate = useNavigate()

//redirect on login
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

        <button className="viewchallenge-button body-font login" onClick={() => loginWithRedirect()}>LOGIN</button>

      </section>
    </>
  );
}
