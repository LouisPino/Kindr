import { useState } from "react";
import { createChallenge } from "../../utilities/challenge-service";

import ('./challenge.css')

// define the function boilerplate with export
export default function NewChallengeForm() {
  

  
  return (
    <section>
      <form className="new-challenge-form">
        <label htmlFor="name">
          Challenge Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="add a title"
            // value={newForm.name}
            // onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Profile Image
          <input
            type="text"
            name="description"
            id="description"
            // value={newForm.image}
            // onChange={handleChange}
            placeholder="add challenge description"
          />
        </label>
        <input className="new-challenge-button" type="submit" value="Create Challenge" />
      </form>
    </section>
  );
}
