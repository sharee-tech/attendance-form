import { NavLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import AccessTokenHook from "./AccessTokenHook";
import AccessProfiles from "./Profiles";

export default function Admin(profiles, setProfiles) {
  const { user } = useAuth();
  return (
    <>
      {/* <div>You are logged in and your email address is {user.email}</div> */}
      <AccessProfiles />
      <br></br>
      <AccessTokenHook />
      {/* <Absences /> */}
    </>
  );
}
