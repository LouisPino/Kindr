import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../utilities/user-service";

import("./edituser.css");

export default function EditUser(props) {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [updatedUser, setUpdatedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [newForm, setNewForm] = useState(initState);

  // console.log('newform', newForm)

  const {id} = useParams()

  const navigate = useNavigate()

  async function handleRequest(){
    try {
        const userData = await getUser(id)
        if(userData._id){
            setUpdatedUser(userData)
            setIsLoading(false)
        }else {
            throw Error('Something went wrong!')
        }
    } catch (error) {
        // console.log(error)
        navigate(`/user/${id}`)
    }   
}

useEffect(()=>{
    handleRequest()
}, [])





  return (
    <>
      <section className="profile-page">
        <img
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1693252945/Laurie_xewfk0.jpg"
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">USER's Deeds</h2>



      
        {/* <img src={user.picture}/> */}
        {/* <p>{user.given_name} {user.family_name || user.email.split("@")[0]} is a loser.</p> */}
      </section>
    </>
  );
}
