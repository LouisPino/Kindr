import { useEffect, useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { findUserByEmail } from "../../utilities/user-service";


export default function NewChallengeForm() {
  //general state
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [userData, setUserData] = useState({});
  let initState = {
    title: "",
    description: "",
    images: [],
    daily: false,
    category: 0,
    username: ""
  };
  const [newForm, setNewForm] = useState(initState);

//run on render, grab user info from db if logged in, else redirect to welcome page
  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const retrievedUserData = await findUserByEmail(user.email);
        setUserData(retrievedUserData);
      }
      fillUserObj();
    } else {
      navigate("/");
    }
  }, []);

  //select input options
  const options = [
    { label: "Community", value: 0 },
    { label: "Nature", value: 1 },
    { label: "Education", value: 2 },
    { label: "Animals", value: 3 },
    { label: "Other", value: 4 },
  ];

//control form input
  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value, username: userData.username };
    setNewForm(updatedData);
  }

  //submit form
  async function handleSubmit(e) {
    e.preventDefault();
    await createChallenge(newForm);
    setNewForm(initState);
    navigate("/dashboard");
  }



  return (
    <section className="newchallenge-page">
      <h2 className="kindr-header h2-header">Submit a New Deed</h2>
      <form className="new-challenge-form" onSubmit={handleSubmit}>
        <label className="chall-label" htmlFor="title">
        <div className="labeltext">Title</div>
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
        <label className="chall-label" htmlFor="description">
        <div className="labeltext">Description</div>
          <input
            type="text"
            name="description"
            id="description"
            value={newForm.description}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
        <label className="chall-label" htmlFor="category">
          <div className="labeltext">Select a category</div>
          <select name="category" value={newForm.value} onChange={handleChange}>
            {options.map((option) => (
              <option
                name="category"
                id="category"
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <input
        id="new-challenge-button"
          className="viewchallenge-button body-font"
          type="submit"
          value="Create Deed"
        />
      </form>
    </section>
  );
}