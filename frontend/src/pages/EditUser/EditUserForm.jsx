<<<<<<< HEAD:frontend/src/pages/EditUser/EditUserForm.jsx
export default function EditUserForm() {



  async function handleSubmit(e){
//     e.preventDefault()
//     console.log(newForm)
//     setNewForm(initState)
//   }


//   function handleChange(e){
//     const updatedData = { ...newForm, [e.target.name]: e.target.value }
//     setNewForm(updatedData)
//   }

   return (
=======
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import("./newuser.css");

export default function NewUser() {
  let initState = {}
  const { loginWithRedirect, logout, user } = useAuth0();
  const [newForm, setNewForm] = useState(initState);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
    async function fillUserObj(){
      const userData = await findUserByEmail(user.email)
      setNewForm(userData)
    }  
    fillUserObj()
    setIsLoading(false)
  }
    else{
      navigate('/')}
  }, [])


  
    async function fillUserObj(){
      const userData = await findUserByEmail(user?.email)
    }
    fillUserObj()




  async function handleSubmit(e){
    e.preventDefault()
    updateUser(newForm)
    navigate('/profile')
  }


  function handleChange(e){
    const updatedData = { ...newForm, [e.target.name]: e.target.value }
    setNewForm(updatedData)
  }
  return isLoading ? (
<>
<h1>LOADING</h1>
</>
  ) : 
  (
    <>
      <section className="profile-page">
        <img
          src={user.picture}
          className="user-picture"
        />
        <h2 className="h2-header kindr-header">Edit Profile Info</h2>

>>>>>>> 4eefd8ed93ead72296d6c3adc115c89754a099bf:frontend/src/pages/NewUser/index.jsx
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
<<<<<<< HEAD:frontend/src/pages/EditUser/EditUserForm.jsx
   )
=======
      </section>
    </>
  );
>>>>>>> 4eefd8ed93ead72296d6c3adc115c89754a099bf:frontend/src/pages/NewUser/index.jsx
}


//update user info after form is submitted and redirect to profile