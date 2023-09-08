import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, updateUser } from "../../utilities/user-service";
import {
  createDailyChallenge,
  getChallenges,
} from "../../utilities/challenge-service";
import ChallengeList from "./ChallengeList";

export default function DailyChallenge({dailyChallenge}) {


  const navigate = useNavigate();

  async function createNewDaily(e) {
    e.preventDefault();
    createDailyChallenge();
    console.log('button clicked')
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
        <button name="completedChallenges">&#10003;</button>
      </div>
      <button className="challenge-block" onClick={createNewDaily}>
        create daily challenge
      </button>
    </>
  );
}