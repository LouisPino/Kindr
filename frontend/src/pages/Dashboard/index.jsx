import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { findUserByEmail, updateUser } from "../../utilities/user-service";

export default function Dashboard() {
  const { user } = useAuth0();
  const {userId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
const navigate = useNavigate()

  useEffect(()=>{
    if(user){
    async function fillUserObj(){
    const userData = await findUserByEmail(user.email)
    }  
    fillUserObj()
    setIsLoading(false)
  }
    else{
      navigate('/')}
  }, [])


  
  return(
    <>
        {isLoading && (
      <>
      <h1>LOADING</h1> 
    </>
    )}
    {!isLoading && user && (
        <>
        <h1>{user.name || user.email.split("@")[0]}'s DASHBOARD</h1> 
      </>
      )}
      </>
    )
}