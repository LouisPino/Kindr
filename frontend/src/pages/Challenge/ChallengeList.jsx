import { Link } from "react-router-dom";

export default function ChallengeList({ challenges }) {
    console.log(challenges)
  return (
    <section className="challenge-list">
      {challenges.map((challenge, idx) => (
        <div className="challenge-block" key={challenge._id}>
            <img src={challenge.images} />
          <h3 className="h3-challenge h3-header kindr-header">
            {challenge.title}
          </h3>
          <p className="challenge-descr body-font">{challenge.description}</p>
        </div>
      ))}
    </section>
  );
}
