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
      text: "Add a Deed",
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
            {!open && (
          <button className="menuBtn" onClick={toggleOpen}>
            <div className="hamburger-ctr">
              <img
                className="hamburger-open"
                src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694202631/hamburger_lththo.svg"
              />
              <img
                className="hamburger-open-bg"
                src="https://res.cloudinary.com/dsvcyich1/image/upload/v1694368406/cloud_zpqj9o.png"
              />
              </div>
          </button>
            )}
          <div className={open ? "sidenav" : "sidenavClosed"}>
          <button className="menuBtn" onClick={toggleOpen}>
            {open && (
              <img
                className="hamburger-closed"
                src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694202631/hamburger_lththo.svg"
              />
            )}
          </button>
           <div> {navData.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  className={open ? "sideitem" : "sideitemClosed"}
                  to={item.link}
                  onClick={()=>setopen(false)}
                >
                  <span className={open ? "linkText" : "linkTextClosed"}>
                    {item.text}
                  </span>
                </NavLink>
              );
            })}
            </div>
            <div>
           {open &&<button id="logout-button" className="viewchallenge-button body-font" onClick={() => logout()}>
              {" "}
              LOGOUT
            </button>}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
