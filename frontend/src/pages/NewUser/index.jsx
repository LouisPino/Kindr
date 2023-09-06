import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import("./newuser.css");

export default function NewUser() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const initState = {
    title: "",
    description: "",
    // images: [],
    // startDate: Date.now(),
    // endDate: Date.now(),
  };
  const [newForm, setNewForm] = useState(initState);
  console.log('newform', newForm)
  async function handleSubmit(e){
    e.preventDefault()
    console.log(newForm)
    setNewForm(initState)
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
        <h2 className="h2-header kindr-header">USER's Deeds</h2>

        return (
    <section>
      <h2 className="kindr-header h2-header">Submit a New Challenge</h2>
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
  );


      
        {/* <img src={user.picture}/> */}
        {/* <p>{user.given_name} {user.family_name || user.email.split("@")[0]} is a loser.</p> */}
      </section>
    </>
  );
}
