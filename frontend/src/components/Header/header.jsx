import { Link } from "react-router-dom";
import './header.css'
import Sidenav from "../Nav/sidebar";
import { useState } from "react";
export default function Header({ navScore }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header-page">
      <Sidenav open={open} setOpen={setOpen} />
      <Link to={"/dashboard"}>
        <h1 id="kindr-header-title" className="kindr-header kindr-nav depth ">Kindr</h1></Link>
      <div className="user-header">
        {window.location.pathname !== '/' &&
          <Link className="header-angel" to={"/profile"}>
            <img className="header-img" src="https://res.cloudinary.com/dsvcyich1/image/upload/v1694368090/user-icon_no2nly.png" />
          </Link>
        }
        <h2 id="user-header-score" className="kindr-header kindr-nav depth">{navScore > 0 ? navScore : ''}</h2>
      </div>
    </header>
  );
}
