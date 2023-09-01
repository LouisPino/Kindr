import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Challenge() {
  const { user, isLoading } = useAuth0();
  const {id} = useParams()
  return(
    <>
<h2>SHOW PAGE FOR CHALLENGE {id}</h2>
      </>
    )
}
