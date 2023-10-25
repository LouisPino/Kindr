import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import ImgUpload from "../../components/UploadImage/Upload";

export default function EditForm({newForm, setNewForm, handleImage}) {
  // let initState = {};
  const { user } = useAuth0();
  // const [newForm, setNewForm] = useState(initState);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) setIsLoading(false);
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();
    updateUser(newForm);
    navigate("/profile");
  }


  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(updatedData);
  }
  return (
    <form className="new-challenge-form" onSubmit={handleSubmit}>
      <label htmlFor="name" className="chall-label">
        <div className="labeltext">NAME</div>
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
        <div className="labeltext">USERNAME</div>
        <input
          type="text"
          name="username"
          id="description"
          value={newForm.username}
          onChange={handleChange}
          placeholder="add challenge description"
        />
      </label>
      <ImgUpload newForm={newForm} setNewForm={setNewForm}/>
      <input
        className="viewchallenge-button body-font"
        type="submit"
        value="Update Profile"
      />
    </form>
  );
}
