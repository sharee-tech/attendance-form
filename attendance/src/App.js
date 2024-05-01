import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./members/Login";
import Home from "./pages/Home";
import Absences from "./pages/Absences";
import Roster from "./pages/roster/Roster";
import Register from "./members/Register";
import AuthRoute from "./auth/AuthRoute";
import AdminRoute from "./auth/AdminRoute";
import NavMenu from "./layout/NavMenu";
import ResetPassword from "./members/ResetPassword";
import UpdatePassword from "./members/UpdatePassword";
import Footer from "./layout/Footer";

function App() {
  return (
    <>
      <NavMenu />
      <div className="page-container">
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/roster" element={<Roster />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path="/admin" element={<Admin />} />

            <Route path="/absences" element={<Absences />} />

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
