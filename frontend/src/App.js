import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import _404 from "./pages/404";

function App() {
  return (
    <div className="App">
      {/* <svg viewBox="0 0 105 105">
        <path
          d="M 25,60 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z"
        />
      </svg> */}
      <Nav />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges/:id" element={<Challenge />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<_404 />} />
      </Routes>
    </div>
  );
}

export default App;
