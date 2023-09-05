import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Challenge from '../Challenge';


export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  const {userId} = useParams()
  return(
    <>
    {!isLoading && user && (
        <>
        <h1>{user.given_name}'s Dashboard</h1> 
        <Challenge />
        <Link to={'/'}> <button>GO TO WELCOME</button> </Link>
        <Link to={'/profile'}> <button>GO TO PROFILE</button> </Link>
      </>
      )}
      </>
    )
}
