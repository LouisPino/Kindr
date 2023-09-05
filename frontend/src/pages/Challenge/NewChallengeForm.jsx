
import { useState } from "react";
// import { createPerson } from "../../utilities/people-service";

const initState = {
  text: "",
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

    await createPerson(newForm)
    updatePeople()
    setNewForm(initState)
    // createPerson service function
        // peopleApi.create()
            // data from API is returned and we use it!
  }

  // value prop -> state (DONE)
  // onChange -> f(){}

  function handleChange(e){
    // e -> synthetic event -> generated when react detects a form input on a controlled form field. 
    // console.log(e.target, e.target.name, e.target.value)
    const updatedData = { ...newForm, [e.target.name]: e.target.value }
    setNewForm(updatedData)
  }
  
  return (
    <section className="NewPersonForm-section">
      <form onSubmit={handleSubmit}>
        {/* iterator that will process some data from init state and for each key create an input field with props provided for type, id, value, onChange */}
        {/* custom hook opportunity for reusing or package formState */}
        <label htmlFor="name">
          People Name*
          <input
            type="text"
            name="name"
            id="name"
            placeholder="add a name"
            value={newForm.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="image">
          Profile Image
          <input
            type="text"
            name="image"
            id="image"
            value={newForm.image}
            onChange={handleChange}
            placeholder="add an image for the new person"
          />
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            value={newForm.title}
            onChange={handleChange}
            placeholder="add a person title"
          />
        </label>
        <input type="submit" value="Create Person" />
      </form>
    </section>
  );
}

// populate state

// return some JSX
