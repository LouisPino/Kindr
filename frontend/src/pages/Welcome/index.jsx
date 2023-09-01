import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();



  return (<>
    <h2>WELCOME PAGE</h2>

    </>
  );
}




// <header className="welcome">
// {!isLoading && !user && (
//   <button onClick={() => loginWithRedirect()}>LOGIN</button>
// )}
// {!isLoading && user && (
//   <>
//     <button onClick={() => logout()}> LOGOUT</button>
//   </>
// )}
// </header>