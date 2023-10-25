import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import ImgUpload from "../../components/UploadImage/Upload";
import EditForm from "../../components/EditProfile/EditForm";

export default function TestNewUser({ setOpen }) {
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
      setOpen(false);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userData) setIsLoading(false);
  }, [userData]);

  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(updatedData);
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

  return isLoading ? (
    <>
      <h1 className="loading">LOADING</h1>
      <img
        src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1694439817/loading-animation_nerskz.gif"
        alt=""
      />
    </>
  ) : (
    <>
      <section className="profile-page">
        <img src={newForm.picture} className="user-picture" />
        <h2 className="h2-header kindr-header">Edit Profile Info</h2>

        <section>
          <EditForm handleImage={handleImage} newForm={newForm} setNewForm={setNewForm} />
        </section>
      </section>
    </>
  );
}
