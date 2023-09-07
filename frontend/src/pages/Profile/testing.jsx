import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findChallengesById, findUserByEmail, updateUser } from "../../utilities/user-service";
import ChallengeList from "../Challenge/ChallengeList";


import("./profile.css");

export default function Profile() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [challengeArr, setChallengeArr] = useState([]);
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

  useEffect(() => {
    setIsLoading(false);
  }, [userData]);

  if (userData && !isLoading) {
    return (
      <><div>hiii</div></>
    )
  }
}




<section className="challenge-list">
{challenges.map((challenge, idx) => (
  <div className="challenge-block" key={challenge._id}>
    <img
      className="challenge-picture"
      src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1692365554/bebpthuftxhz18roqbwl.png"
    />
    <h3 className="h3-challenge h3-header kindr-header">
      {challenge.title}
    </h3>
    <p className="challenge-descr body-font">{challenge.description}</p>
    <p className="challenge-complete body-font">Completed?</p>
    <button name="completedChallenges" id={challenge._id} onClick={addComplete}>
      &#10003;
    </button>
  </div>
))}
</section>