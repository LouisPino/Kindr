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
    setUserData(newUserData)
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
  const picArr = ["https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278247/community-red_c2yd4c.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278531/tree_h8n1mk.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278673/education_poh8l8.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279455/pig_qm4uhw.svg", "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279771/sparkles-svgrepo-com_pwuurr.svg", "DAILY PHOTO"]

  return (
    <div className="daily-challenge-component">
      <p className="completed-righttop body-font daily">Daily Deed</p>
      <div className="challenge-block">
        <img
          className="challenge-picture"
          src={picArr[dailyChallenge.category]}
        />
        <h3 className="h3-challenge h3-header kindr-header">
        {dailyChallenge.title}
        </h3>
        <p className="challenge-descr body-font">{dailyChallenge.description}</p>
        {!userData?.completedChallenges?.includes(dailyChallenge._id) ? <>
          <div className="completed-and-check"><p className="body-font completed-righttop">Completed?</p>
          <button className="checkmark-button" id={dailyChallenge._id} onClick={addComplete}>
            &#10003;
          </button></div>
          </> :
          <>
          <h1 className="youdidit-righttop body-font">You did it!</h1>
          </>
      }
      <button className="viewchallenge-button body-font" onClick={()=> navigate(`/challenges/${dailyChallenge._id}`)}>VIEW DEED</button>
      </div>
      {/* <button className="challenge-block" onClick={createNewDaily}>
        create daily challenge
      </button> */}
      {/* <hr></hr> */}
    </div>
  );
}