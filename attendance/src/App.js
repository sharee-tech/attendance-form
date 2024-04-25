import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Members from "./components/Members";
import Absences from "./components/Absences";
import Roster from "./components/Roster";
import Register from "./components/Register";
import AuthRoute from "./components/AuthRoute";
import NavMenu from "./components/NavMenu";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import Copyright from "./components/Footer";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import Footer from "./components/Footer";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NavMenu />
      <div className="page-container">
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/members" element={<Members />} />
            <Route path="/absences" element={<Absences />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
