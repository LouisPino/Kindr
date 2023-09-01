import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';



function App() {
  const {loginWithRedirect, logout, user, isLoading} = useAuth0()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
            </a>
          {!isLoading && !user && (
            <button onClick={()=> loginWithRedirect()}>LOGIN</button>
            )}
          {!isLoading && user &&(<>
            <h2>Hey, fuck you {user.given_name}</h2>
            <button onClick={()=> logout()}> LOGOUT</button>
            </>
            )}
      </header>
    </div>
  );
}

export default App;
