import { NavLink, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import './header.css'
import { useEffect, useState } from "react";
import { findUserByEmail } from "../../utilities/user-service";

export default function Header() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [userData, setUserData] = useState({})
    useEffect(()=>{
      if(user){
      async function fillUserObj(){
        const retrievedUserData = await findUserByEmail(user.email)
        setUserData(retrievedUserData)
        console.log('hit nav user')
      }
      fillUserObj()
    }
    }, [user])
  return (
    <header className="header-page">
           <Link to={"/dashboard"}>
           <h1 className="kindr-header kindr-nav depth">Kindr</h1></Link>
           <div className="user-header">
           <Link to={"/profile"}>
           <img src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694287417/user-icon_ejs4ww.svg"  />
            </Link>
            <h2 className="user-header-score kindr-header kindr-nav depth">{userData.score}</h2>
            </div>
    </header>
  );
}
