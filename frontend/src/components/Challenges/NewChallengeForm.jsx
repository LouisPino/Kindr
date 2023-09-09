import { useEffect, useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { findUserByEmail } from "../../utilities/user-service";
import UploadImage from "../UploadImage/UploadImage";

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

  const initState = {
    title: "",
    description: "",
    images: [],
    daily: false,
    category: 0,
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
    console.log('updatedData', updatedData)
    setNewForm(updatedData);
  }

  return (
    <section>
      <h2 className="kindr-header h2-header">Submit a New Deed</h2>
      <form className="new-challenge-form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
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
        <label htmlFor="category">
          Select a category
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
          className="new-challenge-button"
          type="submit"
          value="Create Deed"
        />
      </form>

    </section>
  );
}
