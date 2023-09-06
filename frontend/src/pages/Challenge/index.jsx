import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NewChallengeForm from "./NewChallengeForm";
import { getChallenge } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";

export default function Challenge() {
  const { user, isLoading } = useAuth0();
  const { id } = useParams();

  const [challenge, setChallenge] = useState(null);

  return (
    <>
      <h2>SHOW PAGE FOR CHALLENGE {id}</h2>

      <NewChallengeForm  />
    </>
  );
}
