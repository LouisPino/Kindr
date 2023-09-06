import { useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";

import("./challenge.css");

// define the function boilerplate with export
export default function NewChallengeForm({ updateChallenges }) {
  const initState = {
    title: "",
    description: "",
    images: [],
    startDate: Date.now(),
    endDate: Date.now(),
  };
  const [newForm, setNewForm] = useState(initState);
  async function handleSubmit(e) {
    e.preventDefault();
    updateChallenges();
    await createChallenge(newForm);
    setNewForm(initState);
  }

  function handleChange(e) {
    const updatedData = { ...newForm, [e.target.name]: e.target.value };
    setNewForm(updatedData);
  }

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
        <input
          className="new-challenge-button"
          type="submit"
          value="Create Challenge"
        />
      </form>
    </section>
  );
}
