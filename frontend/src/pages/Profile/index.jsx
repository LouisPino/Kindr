import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
console.log(user)


  return (<>
    <h2>PROFILE PAGE</h2>
    <img src={user.picture}/>
    <p>{user.given_name} {user.family_name || user.email.split("@")[0]} is a loser.</p>
    </>
  );
}