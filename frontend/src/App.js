import "./App.css";
import "../src/components/Nav/nav.css"
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddChallenge from "./pages/Challenge";
import ShowChallenge from "./pages/ShowChallenge";
import NewUser from "./pages/NewUser";
import _404 from "./pages/404";
import Sidenav from "./components/Nav/sidebar";
import Header from "./components/Header/header";
import { useState } from "react";

function App() {

  //state
  const [open, setOpen] = useState(false);
  const [navScore, setNavScore] = useState(0)

  //Global Background Cloud Images
  const cloudImg = "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694293421/bg-cloud_yx41el.svg"
  const cloudImg2 = "https://res.cloudinary.com/dpsymdmyi/image/upload/v1694293962/cloud-2_lqhxmy.svg"



  return (
    <div className="App">
      <Header navScore={navScore} />
      {/* <Sidenav open={open} setOpen={setOpen} /> */}
      <img className="bg-cloud" src={cloudImg} />
      <img className="bg-cloud2" src={cloudImg2} />
      <div className="routes">
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard setNavScore={setNavScore} setOpen={setOpen} />} />
          <Route path="/challenges/:id" element={<ShowChallenge setNavScore={setNavScore} setOpen={setOpen} />} />
          <Route path="/challenges/add" element={<AddChallenge />} />
          <Route path="/profile" element={<Profile setOpen={setOpen} />} />
          <Route path="/newuser" element={<NewUser setOpen={setOpen} />} />
          <Route path="/*" element={<_404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
