import { useState } from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'

//OLD SIDENAV FOR DEVELOPMENT ONLY

export default function Sidenav() {
    const navData = [
        {
            id: 0,
            text: "Dashboard",
            link: "/"
        },
        {
            id: 1,
            text: "Profile",
            link: "explore"
        },
        {
            id: 2,
            text: "Add A Challenge",
            link: "statistics"
        },
    ]
    
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }

    return (
      <div className={open? "sidenav" : "sidenavClosed"}>
            <button className="menuBtn" onClick={toggleOpen}>{open? <p>LEFT</p>: <p>RIGHT</p>}
    </button>
    {navData.map(item =>{
        return <NavLink key={item.id} className="sideitem">
 {/* {item.icon} */}
 <span className={open? "linkText" : "linkTextClosed"}>{item.text}</span>
 </NavLink>
        })}
      </div>
    )
  }