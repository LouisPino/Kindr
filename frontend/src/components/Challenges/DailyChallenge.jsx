import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import {
  createDailyChallenge,
  getChallenges,
  updateChallenge,
} from "../../utilities/challenge-service";

export default function DailyChallenge({
  dailyChallenge,
  setNavScore,
  userData,
  setUserData,
}) {
  //general state
  const [imgUploaded, setImgUploaded] = useState(false);
  const navigate = useNavigate();


  let dailyChallengeNew; // variable used for updating daily challenge with photos


  //for use in development only with commented out daily challenge button
  async function createNewDaily(e) {
    e.preventDefault();
    createDailyChallenge();
  }

    //array of challenge icons to display based on category listed in challenge object
  const picArr = [
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278247/community-red_c2yd4c.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278531/tree_h8n1mk.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278673/education_poh8l8.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279455/pig_qm4uhw.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279771/sparkles-svgrepo-com_pwuurr.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694285543/exclamation_jkltnz.svg",
  ];


//runs when image is chosen
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  //called by above function, converts image to data
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedChallenge = { ...dailyChallenge };
      updatedChallenge.images.push({
        url: reader.result,
        userId: userData._id,
      });
      dailyChallengeNew = updatedChallenge;
    };
  };

    //updates challenge with image, updates user with challenge in completed challenges array
  async function handleSubmit(e) {
    e.preventDefault();
    updateChallenge(dailyChallengeNew);
    addComplete();
    setImgUploaded(true);
  }

  async function addComplete() {
    let userChallenges = userData.completedChallenges;
    userChallenges.push(dailyChallenge._id);
    const newUserData = {
      ...userData,
      completedChallenges: userChallenges,
      score: userData.score + 1,
    };
    setNavScore(newUserData.score);
    updateUser(newUserData);
    setUserData(newUserData);
  }

  return !dailyChallenge ? (
    <>
      <h1 className="loading">No Daily Challenge Yet!</h1>
      {/* <button className="challenge-block" onClick={createNewDaily}>
        create daily challenge -for development / testing only-
      </button> */}
    </>
  ) : (
    <div className="daily-challenge-component">
      <p className="body-font daily">Daily Deed</p>
      <div className="challenge-block">
        <img
          className="challenge-picture"
          src={picArr[dailyChallenge.category]}
        />
        {dailyChallenge.username && (
          <p className="challenge-creator body-font">
            {dailyChallenge.category === 5 ? "" : "by"}{" "}
            {dailyChallenge.username}
          </p>
        )}
        <h3 className="h3-challenge h3-header kindr-header">
          {dailyChallenge.title}
        </h3>
        <p className="challenge-descr body-font">
          {dailyChallenge.description}
        </p>
        {!userData?.completedChallenges?.includes(dailyChallenge._id) ? (
          <>
            <div className="completed-and-check">
              <p className="body-font upload-righttop">Completed?</p>
              {imgUploaded ? (
                <button
                  className="checkmark-button"
                  id={dailyChallenge._id}
                  onClick={addComplete}
                >
                  &#10003;
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                  {" "}
                  <label htmlFor="images" className="submitimg-label">
                    <input className="submitimg-input" type="file" name="images" onChange={handleImage} />
                  </label>
                  <input
                    className="viewchallenge-button body-font"
                    type="submit"
                    value="Complete Deed"
                  />
                </form>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="youdidit-righttop body-font">You did it!</h1>
          </>
        )}
        <button
          className="viewchallenge-button body-font"
          onClick={() => navigate(`/challenges/${dailyChallenge._id}`)}
        >
          VIEW DEED
        </button>
      </div>
    </div>
  );
}
