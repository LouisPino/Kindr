import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


export default function Challenge() {
  const { user, isLoading } = useAuth0();
  const {id} = useParams()
  const [challenge, setChallenge] = useState(null)
  const getChallengeData = async () => {

		// make api call and get response
    const response = await fetch("./about.json");

		// turn response into javascript object
    const data = await response.json();

		// set the about state to the data
    setChallenge(data);
  };
  console.log({id})
  return(
    <>
{/* <h1>{challenge.title}</h1> */}
<p>Challenge Details</p>
<h2>Image Gallery</h2>
      </>
    )
}
