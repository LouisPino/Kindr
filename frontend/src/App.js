import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Challenge from "./pages/Challenge";
import EditUser from "./pages/EditUser";
import _404 from "./pages/404";
import React from "react";
import {Cloudinary} from "@cloudinary/url-gen"

function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges/:id" element={<Challenge />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id/edit" element={<EditUser/>}/>
        {/* <Route path="/newuser" element={<EditUser />} /> */}
        <Route path="/*" element={<_404 />} />
      </Routes>
    </div>
  );
}

export default App;
