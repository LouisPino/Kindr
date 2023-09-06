import { useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";

import("./challenge.css");

// define the function boilerplate with export
export default function NewChallengeForm({updateChallenge}) {
  const initState = {
    title: "",
    description: "",
    images: {},
    startDate: "",
    endDate: "",
  };
  const [newForm, setNewForm] = useState(initState);
  async function handleSubmit(e){
    e.preventDefault()
    console.log(newForm)

    await createChallenge(newForm)
    updateChallenge()
    setNewForm(initState)
  }


  function handleChange(e){
    // console.log(e.target, e.target.name, e.target.value)
    const updatedData = { ...newForm, [e.target.name]: e.target.value }
    setNewForm(updatedData)
  }



  return (
    <section>
      <form className="new-challenge-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
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
