import "./App.css";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddChallenge from "./pages/Challenge";
import ShowChallenge from "./pages/ShowChallenge";
import NewUser from "./pages/NewUser";
import _404 from "./pages/404";
import Sidenav from "./components/Nav/sidebar";
import Header from "./components/Header/header";


function App() {
  return (
    <div className="App">
      <Header/>
      <Sidenav />
      {/* <Nav /> */}
      <div className="routes">
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges/:id" element={<ShowChallenge />} />
        <Route path="/challenges/add" element={<AddChallenge />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/*" element={<_404 />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
