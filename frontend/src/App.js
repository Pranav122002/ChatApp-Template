import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";

// import PersonalChat from "./components/PersonalChat";
import CommunityChat from "./components/CommunityChat";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>


          {/* <Route path="/personal-chat" element={<PersonalChat />}></Route> */}
          <Route path="/community-chat" element={<CommunityChat />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
