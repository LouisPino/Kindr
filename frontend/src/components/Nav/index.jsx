import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  return (
    <header className="nav">
      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>LOGIN</button>
      )}
      {!isLoading && user && (
        <>
          <button onClick={() => logout()}> LOGOUT</button>
          <Link to={'/'}> <button>WELCOME</button> </Link>
          <Link to={'/dashboard'}> <button>DASHBOARD</button> </Link>
          <Link to={'/profile'}> <button>PROFILE</button> </Link>
          <Link to={'/challenge/1234'}> <button>CHALLENGE</button> </Link>
          <Link to={'/users'}> <button>USERS</button> </Link>
        </>
      )}
    </header>
  );
}
