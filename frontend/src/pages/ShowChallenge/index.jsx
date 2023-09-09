import { useNavigate, useParams } from "react-router";
import { findChallengesByIds } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  findUserByEmail,
  findUsersByCompletedChalleneges,
  updateUser,
} from "../../utilities/user-service";

import "./showchallenge.css"

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
  const picArr = ["https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278247/community-red_c2yd4c.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278531/tree_h8n1mk.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278673/education_poh8l8.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279455/pig_qm4uhw.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279771/sparkles-svgrepo-com_pwuurr.svg", "DAILY PHOTO"]
  return (
    <>
      <div className="challenge-block" key={challenge._id}>
        <img
          className="challenge-picture"
          src={picArr[challenge.category]}
        />
        <h3 className="h3-challenge h3-header kindr-header">
          {challenge.title}
        </h3>
        <p className="challenge-descr body-font">{challenge.description}</p>
        {!userData?.completedChallenges?.includes(challenge._id) ? (
          <>
                  <div className="completed-and-check"><p className="body-font completed-righttop">Completed?</p>
          <button className="checkmark-button" id={challenge._id} onClick={addComplete}>
            &#10003;
          </button></div>
          </>
        ) : (
          <>
           <h1 className="youdidit-righttop body-font">You did it!</h1>
          </>
        )}
      </div>

      <div className="completed-users-ctr">
        {completedUsers.length ? (
          completedUsers.map((user) => {
            return (
              <div className="completed-user-card">
                <div className="completed-user-info">
                <img className="completed-user-img"src={user.picture} alt="" />
                <h1 className="h3-challenge h3-header kindr-header">{user.username}</h1>
                </div>
                <img className="completed-img"src={user.picture} alt="" />
              </div>
            );
          })
        ) : (
          <h1 className="h3-challenge h3-header kindr-header white">Be the first to complete this Deed!</h1>
        )}
      </div>
    </>
  );
}
