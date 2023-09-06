import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ChallengeList from '../Challenge/ChallengeList';

export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  const {userId} = useParams()
  return(
    <>
    {!isLoading && user && (
        <>
        <h1>{user.given_name || user.email.split("@")[0]}'s Dashboard</h1> 
      </>
      )}
      </>
    )
}