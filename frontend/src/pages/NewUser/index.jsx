import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import("./newuser.css");

export default function NewUser() {
  let initState = {};
  const { loginWithRedirect, logout, user } = useAuth0();
  const [newForm, setNewForm] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const retrievedUserData = await findUserByEmail(user.email);
        setNewForm(retrievedUserData);
        setUserData(retrievedUserData);
      }
      fillUserObj();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userData) setIsLoading(false);
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();
    updateUser(newForm);
    navigate("/profile");
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedData = { ...newForm, picture: reader.result };
      setNewForm(updatedData);
    };
  };

  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(updatedData);
  }
  return isLoading ? (
    <>
      <h1 className="loading">LOADING</h1>
    </>
  ) : (
    <>
      <section className="profile-page">
        <img src={newForm.picture} className="user-picture" />
        <h2 className="h2-header kindr-header">Edit Profile Info</h2>

        <section>
          <form className="new-challenge-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="chall-label">
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
            <label htmlFor="username" className="chall-label">
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
            {/* <label htmlFor="picture" className="chall-label">
              Photo (cloudinary later)
              <input
                type="text"
                name="picture"
                id="description"
                value={newForm.picture}
                onChange={handleChange}
                placeholder="add challenge description"
              />
            </label> */}
            <label htmlFor="picture" className="chall-label">
              <input type="file" name="picture" onChange={handleImage} />
            </label>
            <input
              className="viewchallenge-button body-font"
              type="submit"
              value="Update Profile"
            />
          </form>
        </section>
      </section>
    </>
  );
}
