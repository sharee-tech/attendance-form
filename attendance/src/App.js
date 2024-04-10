import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Members from "./components/Members";
import Absences from "./components/Absences";
import Roster from "./components/Roster";
import Signup from "./components/Signup";
import AuthRoute from "./components/AuthRoute";
import NavMenu from "./components/NavMenu";
import PasswordReset from "./components/PasswordReset";
import UpdatePassword from "./components/UpdatePassword";
import Copyright from "./components/Copyright";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteUser from "./components/ProtectedRouteUser";

function App() {
  return (
    <>
      <NavMenu />
      <div className="page-content">
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/members" element={<Members />} />
            <Route path="/absences" element={<Absences />} />
            <Route path="/roster" element={<Roster />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/signup-thisisthesongthatneverends"
            element={<Signup />}
          />
        </Routes>
      </div>
      <Copyright />
    </>
  );
}

export default App;
