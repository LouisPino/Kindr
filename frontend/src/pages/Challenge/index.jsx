import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import NewChallengeForm from "./NewChallengeForm";
import { getChallenges } from "../../utilities/challenge-service";
import { useEffect, useState } from "react";
import ChallengeList from "./ChallengeList";

export default function Challenge() {
  const { user, isLoading } = useAuth0();
  const { id } = useParams();

  const [challenges, setChallenges] = useState(null);
console.log(challenges)
  async function handleRequest() {
    const challengeResponse = await getChallenges();

    if (challengeResponse.length) {
      setChallenges(challengeResponse);
    } else {
      console.log(challengeResponse);
      // context update for error handling might be called
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <>
      <section className="find-challenge">
        <h2 className="kindr-header h2-header">Find a Challenge</h2>
      </section>
      <ChallengeList challenges={challenges} />
      <NewChallengeForm updateChallenges={handleRequest} />
    </>
  );
}
