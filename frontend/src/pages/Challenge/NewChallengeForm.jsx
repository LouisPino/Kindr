
import { useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";

const initState = {
  title: "",
  description: "",
  image: [],
  challengeStart: "",
  challengeEnd: "",
};

// define the function boilerplate with export
export default function NewChallengeForm() {
  const [newForm, setNewForm] = useState(initState);



  // no post (handleSubmit) -> controlled form have a post?
  async function handleSubmit(e){
    // in e -> preventDefault()
    e.preventDefault() //  prevent the page from sending a get request to the current page (queryParams: x-www-url-encoded data)
    console.log(newForm)

    await createChallenge(newForm)
    // updatePeople()
    setNewForm(initState)

  function handleChange(e){
    const updatedData = { ...newForm, [e.target.name]: e.target.value }
    setNewForm(updatedData)
  }
  
  return (
    <section className="NewPersonForm-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Challenge Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="add a title"
            value={newForm.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Profile Image
          <input
            type="text"
            name="description"
            id="description"
            value={newForm.image}
            onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
        <input type="submit" value="Create Challenge" />
      </form>
    </section>
  );
}
}
