import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findUserByEmail } from "../../utilities/user-service";
import("./newuser.css");

export default function NewUser() {
  let initState = {}
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [newForm, setNewForm] = useState(initState);
  
  useEffect(()=>{
    async function fillUserObj(){
      const userData = await findUserByEmail(user.email)
      console.log('userData', userData)
      setNewForm(userData)
    }
fillUserObj()
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    setNewForm(initState)
//update user
  }


  function handleChange(e){
    const updatedData = { ...newForm, [e.target.name]: e.target.value }
    setNewForm(updatedData)
  }
  return (
    <>
      <section className="profile-page">
        <img
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1693252945/Laurie_xewfk0.jpg"
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">Edit Profile Info</h2>

    <section>
      <form className="new-challenge-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          NAME
          <input
            type="text"
            name="name"
            id="title"
            placeholder="add a title"
            value={newForm.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="username">
          USERNAME
          <input
            type="text"
            name="username"
            id="description"
            value={newForm.username}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
                <label htmlFor="picture">
          Photo (cloudinary later)
          <input
            type="text"
            name="picture"
            id="description"
            value={newForm.picture}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
        <input
          className="new-challenge-button"
          type="submit"
          value="Update Profile"
        />
      </form>
    </section>
      </section>
    </>
  );
}





//Get user info to prepopulate form
//update user info after form is submitted and redirect to profile