import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import("./newuser.css");

export default function NewUser() {
  let initState = {}
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [newForm, setNewForm] = useState(initState);
  console.log(user)
  useEffect(()=>{
    
    
    initState = 
    
    setNewForm(initState)

  }, [])
  
  console.log('newform', newForm)
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
        <label htmlFor="title">
          Challenge Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="add a title"
            value={newForm.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            type="text"
            name="description"
            id="description"
            value={newForm.description}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
                <label htmlFor="description">
          Description
          <input
            type="text"
            name="description"
            id="description"
            value={newForm.description}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
        <input
          className="new-challenge-button"
          type="submit"
          value="Create Challenge"
        />
      </form>
    </section>
      </section>
    </>
  );
}





//Get user info to prepopulate form
//update user info after form is submitted and redirect to profile