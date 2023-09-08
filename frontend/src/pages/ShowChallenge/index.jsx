import { useNavigate, useParams } from "react-router";
import { findChallengesByIds } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  findUserByEmail,
  findUsersByCompletedChalleneges,
  updateUser,
} from "../../utilities/user-service";

export default function ShowChallenge() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState({});
  const [userData, setUserData] = useState({});
  const [completedUsers, setCompletedUsers] = useState([]);
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

  async function addComplete(e) {
    e.preventDefault();
    let userChallenges = userData.completedChallenges;

    userChallenges.push(e.target.id);

    const newUserData = { ...userData, [e.target.name]: userChallenges };
    console.log("newUserData", newUserData);

    updateUser(newUserData);
    setUserData(newUserData);
    console.log("user", user);
  }
  useEffect(() => {
    async function getChallenge() {
      const ids = [id];
      const gotChallenge = await findChallengesByIds(ids);
      setChallenge(gotChallenge[0]);
      const gotUsers = await findUsersByCompletedChalleneges(id);
      setCompletedUsers(gotUsers);
    }
    getChallenge();
  }, []);

  return (
    <>
      <div className="challenge-block" key={challenge._id}>
        <img
          className="challenge-picture"
          src="https://res.cloudinary.com/dpsymdmyi/image/upload/v1692365554/bebpthuftxhz18roqbwl.png"
        />
        <h3 className="h3-challenge h3-header kindr-header">
          {challenge.title}
        </h3>
        <p className="challenge-descr body-font">{challenge.description}</p>
        {!userData?.completedChallenges?.includes(challenge._id) ? (
          <>
            <p className="challenge-complete body-font">Completed?</p>
            <button
              name="completedChallenges"
              id={challenge._id}
              onClick={addComplete}
            >
              &#10003;
            </button>
          </>
        ) : (
          <>
            <h1>YOU DID IT ALREADY</h1>
          </>
        )}
      </div>

      <div className="completed-users-ctr">
        {completedUsers.length ? (
          completedUsers.map((user) => {
            return (
              <div className="completed-user-card">
                <h1>{user.username}</h1>
                <img src={user.picture} alt="" />
              </div>
            );
          })
        ) : (
          <h1>Be the first to complete this challenge!</h1>
        )}
      </div>
    </>
  );
}
