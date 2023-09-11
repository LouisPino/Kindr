import { useNavigate, useParams } from "react-router";
import {
  findChallengesByIds,
  updateChallenge,
} from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  findUserByEmail,
  findUsersByCompletedChalleneges,
  updateUser,
} from "../../utilities/user-service";

import "./showchallenge.css";

export default function ShowChallenge({ setNavScore, setOpen }) {
  const { loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [userData, setUserData] = useState(null);
  const [completedUsers, setCompletedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const retrievedUserData = await findUserByEmail(user.email);
        setUserData(retrievedUserData);
      }
      fillUserObj();
      setOpen(false);
    } else {
      // navigate("/");
    }
  }, []);

  async function addComplete(e) {
    e.preventDefault();
    let userChallenges = userData.completedChallenges;
    userChallenges.push(e.target.id);
    const newUserData = {
      ...userData,
      [e.target.name]: userChallenges,
      score: userData.score + 1,
    };
    setNavScore(newUserData.score);
    updateUser(newUserData);
    setUserData(newUserData);
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
  }, [userData]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // let fullChallenge = {...challenge}
      const updatedChallenge = { ...challenge };
      updatedChallenge.images.push({
        url: reader.result,
        userId: userData._id,
      });
      setChallenge(updatedChallenge);
    };
  };

  useEffect(() => {
    if (completedUsers && challenge) setIsLoading(false);
  }, [completedUsers]);

  async function handleSubmit(e) {
    e.preventDefault();
    updateChallenge(challenge);
    // navigate("/challenges");
  }

  const picArr = [
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278247/community-red_c2yd4c.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278531/tree_h8n1mk.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278673/education_poh8l8.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279455/pig_qm4uhw.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279771/sparkles-svgrepo-com_pwuurr.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694285543/exclamation_jkltnz.svg",
  ];

  return isLoading ? (
    <>
      <h1 className="loading">LOADING...</h1>
    </>
  ) : (
    <>
      <div className="challenge-block" key={challenge._id}>
        <img className="challenge-picture" src={picArr[challenge.category]} />
        {challenge.username && (
          <p className="challenge-creator body-font">
            {challenge.category === 5 ? "" : "by"} {challenge.username}
          </p>
        )}
        <h3 className="h3-challenge h3-header kindr-header">
          {challenge.title}
        </h3>
        <p className="challenge-descr body-font">{challenge.description}</p>
        {!userData?.completedChallenges?.includes(challenge._id) ? (
          <>
            <div className="completed-and-check">
              <p className="body-font completed-righttop">Completed?</p>
              <button
                className="checkmark-button"
                id={challenge._id}
                onClick={addComplete}
              >
                &#10003;
              </button>
            </div>
          </>
        ) : (
          <>
            {challenge.images.length > 0 ? (
              <>
                <h1 className="youdidit-righttop body-font">You did it!</h1>
              </>
            ) : (
              <>
                {/* <h1 className="youdidit-righttop body-font">You did it!</h1> */}
                <form className="submitphoto-Challenge" onSubmit={handleSubmit}>
                  {" "}
                  <label className="submitimg-label" htmlFor="images">
                    <input className="submitimg-input" type="file" name="images" onChange={handleImage} />
                  </label>
                  <input
                    className="viewchallenge-button body-font"
                    type="submit"
                    value="Upload Image"
                  />
                </form>
              </>
            )}
          </>
        )}
      </div>

      <div className="completed-users-ctr">
        {completedUsers.length ? (
          completedUsers.map((user) => {
            return (
              <div className="completed-user-card">
                <div className="completed-user-info">
                  <img
                    className="completed-user-img"
                    src={user.picture}
                    alt=""
                  />
                  <h1 className="h3-challenge h3-header kindr-header">
                    {user.username}
                  </h1>
                </div>
                <img className="completed-img" src={user.picture} alt="" />
              </div>
            );
          })
        ) : (
          <h1 className="h3-challenge h3-header kindr-header white">
            Be the first to complete this Deed!
          </h1>
        )}
      </div>
    </>
  );
}
