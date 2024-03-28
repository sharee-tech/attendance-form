import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Members from "./components/Members";
import Absences from "./components/Absences";
import Roster from "./components/Roster";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/members" element={<Members />} />
        <Route exact path="/absences" element={<Absences />} />
        <Route exact path="/roster" element={<Roster />} />
      </Routes>
    </>
  );
}

export default App;
