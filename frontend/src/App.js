import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PersonalChat from "./components/PersonalChat";
import GroupChat from "./components/GroupChat";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/personal-chat" element={<PersonalChat />}></Route>
          <Route path="/group-chat" element={<GroupChat />}></Route>
        </Routes>
        <ToastContainer theme="light" position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
