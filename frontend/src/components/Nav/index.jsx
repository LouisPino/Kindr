import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import("./nav.css");

export default function Nav() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  return (
    <header className="nav">
      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>LOGIN</button>
      )}
      {!isLoading && user && (
        <>
          <h1 className="kindr-header kindr-nav">Kindr</h1>
          <button onClick={() => logout()}> LOGOUT</button>
          <Link to={"/"}>
            {" "}
            <button>WELCOME</button>{" "}
          </Link>
          <Link to={"/dashboard"}>
            {" "}
            <button>DASHBOARD</button>{" "}
          </Link>
          <Link to={"/profile"}>
            {" "}
            <button>PROFILE</button>{" "}
          </Link>
          <Link to={"/challenges/add"}>
            {" "}
            <button>ADD CHALLENGE</button>{" "}
          </Link>
          <Link to={"/users"}>
            {" "}
            <button>USERS</button>{" "}
          </Link>
          <Link to={"/newuser"}>
            {" "}
            <button>NEW USER FORM</button>{" "}
          </Link>
        </>
      )}
    </header>
  );
}
