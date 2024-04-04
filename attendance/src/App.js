import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Members from "./components/Members";
import Absences from "./components/Absences";
import Roster from "./components/Roster";
// import { useEffect, useState } from "react";
// import { supabase } from "./config/supabaseClient";
// import { Auth, SignIn } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import AuthRoute from "./components/AuthRoute";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider";
import NavMenu from "./components/NavMenu";
import PasswordReset from "./components/PasswordReset";
import UpdatePassword from "./components/UpdatePassword";
// import { Session } from "@supabase/supabase-js";
// import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  // const [session, setSession] = (useState < Session) | (null > null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // if (!session) {
  //   // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //       </Routes>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/admin" element={<Admin />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/members" element={<Members />} />
  //         <Route path="/absences" element={<Absences />} />
  //         <Route path="/roster" element={<Roster />} />
  //       </Routes>
  //     </>
  //   );
  // }

  return (
    <>
      <NavMenu />
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
