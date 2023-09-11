import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../utilities/user-service";
import { updateUser } from "../../utilities/user-service";
import ReactPaginate from "react-paginate";
import"../../pages/Dashboard/dashboard.css"
import { updateChallenge } from "../../utilities/challenge-service";

export default function ChallengeList({
  challenges,
  location,
  setNavScore,
  userData,
  setUserData,
}) {
  let sortedChallenges = [];
  let sortedChallengesidx = 0;
  for (let i = challenges.length - 1; i >= 0; i--) {
    sortedChallenges[sortedChallengesidx] = challenges[i];
    sortedChallengesidx++;
  }
let challenge
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = sortedChallenges.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(challenges.length / itemsPerPage));
  }, []);

  function showCondition(challenge) {
    if (location === "profile") {
      return !!userData;
    } else {
      return !challenge.daily && userData;
    }
  }

  const picArr = [
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278247/community-red_c2yd4c.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278531/tree_h8n1mk.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694278673/education_poh8l8.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279455/pig_qm4uhw.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694279771/sparkles-svgrepo-com_pwuurr.svg",
    "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694285543/exclamation_jkltnz.svg",
  ];
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [imgUploaded, setImgUploaded] = useState(false);
  async function addComplete(e) {
    let userChallenges = userData.completedChallenges;
    userChallenges.push(e.target.id);
    const newUserData = {
      ...userData,
      completedChallenges: userChallenges,
      score: userData.score + 1,
    };
    setNavScore(newUserData.score);
    updateUser(newUserData);
    setUserData(newUserData);
  }

  useEffect(() => {
    setIsLoading(false);
  }, [userData]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
     challenge = sortedChallenges[sortedChallenges.findIndex((chal)=> chal._id === e.target.id)]

  };


  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const updatedChallenge = { ...challenge };
      updatedChallenge.images.push({
        url: reader.result,
        userId: userData._id,
      });
      // setChallenge(updatedChallenge);
    };
  };

  async function handleSubmit(e) {
    e.preventDefault();
    updateChallenge(challenge);
    addComplete(e)
  }


  return isLoading ? (
    <>
      <h1 className="loading">LOADING...</h1>
    </>
  ) : (
    <>
      <section className="challenge-list">
        <div>
          {subset.map((challenge) => {
         if (showCondition(challenge)) {
          return (
            <div className="challenge-block" key={challenge._id}>
              <img
                className="challenge-picture"
                src={picArr[challenge.category]}
              />
            {challenge.username &&  
             <p className="challenge-creator body-font" >{challenge.category === 5 ? "" : "by"} {challenge.username}</p>}
              <h3 className="h3-challenge h3-header kindr-header">
                {challenge.title}
              </h3>
              <p className="challenge-descr body-font">
                {challenge.description}
              </p>
              {!userData?.completedChallenges?.includes(challenge._id) ? (
                <>
                  <div className="completed-and-check">
                    <p className="body-font completed-righttop">Completed?</p>
    
            <form id={challenge._id} onSubmit={handleSubmit}>
              {" "}
              <label htmlFor="images" className="chall-label">
                <input type="file" name="images" id={challenge._id} onChange={handleImage} />
              </label>
              <input
                className="viewchallenge-button body-font"
                type="submit"
                value="Upload Image"
              />
            </form>
            {/* } */}
                  </div>
                </>
              ) : (
                <>
                  {location !== "profile" && (
                    <h1 className="youdidit-righttop body-font">
                      You did it!
                    </h1>
                  )}
                </>
              )}
              {location !== "profile" ? (
                <>
                  {
                    <button
                      className="viewchallenge-button body-font"
                      onClick={() => navigate(`/challenges/${challenge._id}`)}
                    >
                      VIEW DEED
                    </button>
                  }
                </>
              ) : (
                <>
                  {
                    <button
                      className="profile-viewchallenge"
                      onClick={() => navigate(`/challenges/${challenge._id}`)}
                    >
                      VIEW DEED
                    </button>
                  }
                </>
              )}
            </div>
          );
        }
})}
       {  totalPages > 1 && <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            previousLabel={"<<"}
            nextLabel={">>"}
            containerClassName={"pagination-container"}
            activeLinkClassName={"active-page white pointer"}
            pageLinkClassName={"challenge-descr body-font pointer"}
            previousLinkClassName={"challenge-descr body-font pointer"}
            nextLinkClassName={"challenge-descr body-font pointer"}
          />}
        </div>
      </section>
    </>
  );
}
