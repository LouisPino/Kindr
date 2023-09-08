import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";

export default function Sidenav() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();

  const navData = [
    {
      id: 0,
      text: "Home",
      link: "/dashboard",
    },
    {
      id: 1,
      text: "Profile",
      link: "/profile",
    },
    {
      id: 2,
      text: "Add a Challenge",
      link: "/challenges/add",
    },
  ];

  const [open, setopen] = useState(false);
  // const [left, setLeft] = useState(false)
  const toggleOpen = () => {
    setopen(!open);
    // setFontWidth(!left)
  };

  return (
    <header className="nav">
      {/* {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>LOGIN</button>
      )} */}
      {!isLoading && user && (
        <>
         {/* <h1 className="kindr-header kindr-nav">Kindr</h1> */}
          {/* <button onClick={() => logout()}> LOGOUT</button> */}
          <div className={open ? "sidenav" : "sidenavClosed"}>
            <button className="menuBtn" onClick={toggleOpen}>
              {open ? <img className="hamburger-open" src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694202631/hamburger_lththo.svg" /> : <img className="hamburger-closed" src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694202631/hamburger_lththo.svg" />}
            </button>
            {navData.map((item) => {
              return (
                <NavLink key={item.id} className={open ? "sideitem" : "sideitemClosed"} to={item.link}>
                  <span className={open ? "linkText" : "linkTextClosed"}>
                    {item.text}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
}
