import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import {
  createDailyChallenge,
  getChallenges,
} from "../../utilities/challenge-service";

export default function DailyChallenge({dailyChallenge}) {
  const { loginWithRedirect, logout, user } = useAuth0();
  async function addComplete(e) {
    e.preventDefault()
    let userChallenges = userData.completedChallenges

    userChallenges.push(e.target.id)

    const newUserData = {...userData, [e.target.name]: userChallenges}
    console.log('newUserData', newUserData)

    updateUser(newUserData)
    console.log('user', user)
  }

  const [userData, setUserData] = useState({});
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

  const navigate = useNavigate();

  async function createNewDaily(e) {
    e.preventDefault();
    createDailyChallenge();
  }

  return (
    <>
      <div className="challenge-block">
        <img
          className="challenge-picture"
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1692365554/bebpthuftxhz18roqbwl.png"
        />
        <h3 className="h3-challenge h3-header kindr-header">
        {dailyChallenge.title}
        </h3>
        <p className="challenge-descr body-font">{dailyChallenge.description}</p>
        <p className="challenge-complete body-font">Completed?</p>
        <button name="completedChallenges" id={dailyChallenge._id} onClick={addComplete}>
            &#10003;
          </button>
      </div>
      {/* <button className="challenge-block" onClick={createNewDaily}>
        create daily challenge
      </button> */}
    </>
  );
}