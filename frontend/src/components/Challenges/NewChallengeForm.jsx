import { useEffect, useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { findUserByEmail } from "../../utilities/user-service";

// define the function boilerplate with export
export default function NewChallengeForm() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});


  const options = [
    { label: "Community", value: 0 },
    { label: "Nature", value: 1 },
    { label: "Education", value: 2 },
    { label: "Animals", value: 3 },
    { label: "Other", value: 4 },
  ];


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
  console.log(userData.username)

  const initState = {
    title: "",
    description: "",
    images: [],
    daily: false,
    category: 0,
    username: "test"
  };
  const [newForm, setNewForm] = useState(initState);
  async function handleSubmit(e) {
    e.preventDefault();
    await createChallenge(newForm);
    setNewForm(initState);
    navigate("/dashboard");
  }

  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(updatedData);
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
                // value={newForm.category}
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
