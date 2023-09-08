import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function Header() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  return (
    <header className="header-page">
      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>LOGIN</button>
      )}

      {!isLoading && user && (
            <h1 className="kindr-header kindr-nav">Kindr</h1>
      )}
    </header>
  );
}
