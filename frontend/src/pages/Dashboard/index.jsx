import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth0();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState(null);



  const [userData, setUserData] = useState({})
  
  useEffect(()=>{
    if(user){
    async function fillUserObj(){
       const retrievedUserData = await findUserByEmail(user.email)
      setUserData(retrievedUserData)
    }  
    fillUserObj()
  }
    else{
      navigate('/')}
  }, [])



  async function handleRequest() {
    const challengeResponse = await getChallenges();

    if (challengeResponse.length) {
      console.log("challengersp", challengeResponse);
      setChallenges(challengeResponse);
    } else {
      console.log(challengeResponse);
      // context update for error handling might be called
    }
  }
  useEffect(() => {
    if (challenges) {
      setIsLoading(false);
    }
  }, [challenges]);

  useEffect(() => {
    if (user) {
      async function fillUserObj() {
        const userData = await findUserByEmail(user.email);
        await handleRequest();
      }

      fillUserObj();
    } else {
      navigate("/");
    }
  }, []);

  return isLoading ? (
    <>
      <h1>LOADING</h1>
    </>
  ) : (
    <>
      <h1>{userData.username}'s DASHBOARD</h1>
      <ChallengeList challenges={challenges} />
    </>
  );
}
