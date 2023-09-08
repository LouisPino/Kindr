import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import NewUser from "./pages/NewUser";
import _404 from "./pages/404";
import Sidenav from "./components/Nav/sidebar";


function App() {
  return (
    <div className="App">
      <Sidenav />
      {/* <Nav /> */}
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges/:id" element={<Challenge />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/*" element={<_404 />} />
      </Routes>
    </div>
  );
}

export default App;
