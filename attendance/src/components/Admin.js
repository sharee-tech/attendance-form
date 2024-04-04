import { NavLink } from "react-router-dom";
import Header from "./Header";
import Absences from "./Absences";
import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function Admin() {
  const { user } = useAuth();
  return (
    <>
      <div>You are logged in and your email address is {user.email}</div>
      {/* <div>You are logged in!</div> */}
      <Header />
      <Absences />
    </>
  );
}
