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
import AuthProvider from "./contexts/AuthProvider";
import { useAuth } from "./contexts/AuthProvider";
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
  //         <Route exact path="/" element={<Home />} />
  //       </Routes>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <Routes>
  //         <Route exact path="/" element={<Home />} />
  //         <Route exact path="/admin" element={<Admin />} />
  //         <Route exact path="/login" element={<Login />} />
  //         <Route exact path="/members" element={<Members />} />
  //         <Route exact path="/absences" element={<Absences />} />
  //         <Route exact path="/roster" element={<Roster />} />
  //       </Routes>
  //     </>
  //   );
  // }

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/members" element={<Members />} />
          <Route exact path="/absences" element={<Absences />} />
          <Route exact path="/roster" element={<Roster />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
