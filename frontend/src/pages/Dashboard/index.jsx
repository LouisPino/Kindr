import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail, updateUser } from "../../utilities/user-service";

export default function Dashboard() {
  const { user, isLoading } = useAuth0();
  const {userId} = useParams()
const navigate = useNavigate()
const [userData, setUserData] = useState({})

  useEffect(()=>{
    if(user){
    async function fillUserObj(){
    const userData = await findUserByEmail(user.email)
    }  
    fillUserObj()
  }
    else{
      navigate('/')}
  }, [])


  
  return(
    <>
    {!isLoading && user && (
        <>
        <h1>{user.name || user.email.split("@")[0]}'s DASHBOARD</h1> 
      </>
      )}
      </>
    )
}