import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// import React, { useContext, useState, useEffect } from "react";
// import { supabase } from "../config/supabaseClient";

// const AuthContext = React.createContext();

// export function UseAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active sessions and sets the user
//     const session = supabase.auth.session();

//     setUser(session?.user ?? null);
//     setLoading(false);

//     // Listen for changes on auth state (logged in, signed out, etc.)
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setUser(session?.user ?? null);
//         setLoading(false);
//       }
//     );

//     return () => {
//       listener?.unsubscribe();
//     };
//   }, []);

//   // Will be passed down to Signup, Login and Dashboard components
//   const value = {
//     signUp: (data) => supabase.auth.signUp(data),
//     signIn: (data) => supabase.auth.signIn(data),
//     signOut: () => supabase.auth.signOut(),
//     user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }
