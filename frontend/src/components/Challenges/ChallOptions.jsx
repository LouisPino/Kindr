import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { findUserByEmail } from "../../utilities/user-service";



export default function Options() {
    const navigate = useNavigate()
    const { loginWithRedirect, logout, user } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user) {
          async function fillUserObj() {
            const retrievedUserData = await findUserByEmail(user.email);
            setUserData(retrievedUserData);
          }
          fillUserObj();
        } else {
          navigate("/");
        }
      }, []);


    const options = [

        { label: 'Fruit', value: 'fruit' },
     
        { label: 'Vegetable', value: 'vegetable' },
     
        { label: 'Meat', value: 'meat' },
     
      ];
     
      const [value, setValue] = useState('fruit');
     
      const handleChange = (event) => {
     
        setValue(event.target.value);
     
      };
     
      return (
     
        <div>
     
          <label>
     
            What do we eat?
     
            <select value={value} onChange={handleChange}>
     
              {options.map((option) => (
     
                <option value={option.value}>{option.label}</option>
     
              ))}
     
            </select>
     
          </label>
     
          <p>We eat {value}!</p>
     
        </div>
     
      );
     
     

         }

