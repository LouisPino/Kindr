import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NewChallengeForm from "../../components/Challenges/NewChallengeForm";
import { getChallenges } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
import ChallengeList from "../../components/Challenges/ChallengeList";
import"./challenge.css"

export default function Challenge() {

  return (
    <>
  <NewChallengeForm />
  </>
  )
  

}
