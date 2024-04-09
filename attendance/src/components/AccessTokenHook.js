import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

function AccessTokenHook() {
  const [userLevel, setUserLevel] = useState(0);
  const [event, setEvent] = useState({ user_id: null, claims: {} });

  useEffect(() => {
    // Function to fetch the user's session from Supabase
    const fetchUserSession = async () => {
      try {
        // Fetch the user's session
        const user = supabase.auth.user();

        // If user session exists, update the event object with the user_id
        if (user) {
          setEvent((prevEvent) => ({
            ...prevEvent,
            user_id: user.id, // Assuming the user's ID is stored as 'id' in Supabase user session
          }));
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    // Function to fetch the user's level from the Supabase profiles table
    const fetchUserLevel = async () => {
      try {
        if (!event.user_id) {
          return; // No need to fetch user level if user_id is not available
        }
        // Make a request to fetch the user's profile from the profiles table
        const { data, error } = await supabase
          .from("profiles")
          .select("level")
          .eq("user_id", event.user_id)
          .single();

        if (error) {
          throw error;
        }

        // Update the user level in the state
        setUserLevel(data ? data.level : 0);
      } catch (error) {
        console.error("Error fetching user level:", error);
      }
    };

    fetchUserLevel();
  }, [event.user_id]);

  useEffect(() => {
    // Update the event object with the user's level
    setEvent((prevEvent) => ({
      ...prevEvent,
      claims: {
        ...prevEvent.claims,
        level: userLevel,
      },
    }));
  }, [userLevel]);

  return (
    <div>
      <p>User ID: {event.user_id}</p>
      <p>User Level: {userLevel}</p>
      <p>Event: {JSON.stringify(event)}</p>
    </div>
  );
}

export default AccessTokenHook;

// import React, { useState, useEffect } from "react";

// function AccessTokenHook() {
//   const [userLevel, setUserLevel] = useState(0);
//   const [event, setEvent] = useState({ user_id: null, claims: {} });

//   useEffect(() => {
//     // Function to fetch the user's level from the backend
//     const fetchUserLevel = async () => {
//       try {
//         // Make a request to your backend to fetch the user's level
//         const response = await fetch("/api/profiles", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ user_id: event.user_id }),
//         });
//         const data = await response.json();
//         // Update the user level in the state
//         setUserLevel(data.level || 0);
//       } catch (error) {
//         console.error("Error fetching user level:", error);
//       }
//     };

//     fetchUserLevel();
//   }, [event.user_id]);

//   useEffect(() => {
//     // Update the event object with the user's level
//     setEvent((prevEvent) => ({
//       ...prevEvent,
//       claims: {
//         ...prevEvent.claims,
//         level: userLevel,
//       },
//     }));
//   }, [userLevel]);

//   return (
//     <div>
//       <p>User Level: {userLevel}</p>
//       <p>Event: {JSON.stringify(event)}</p>
//     </div>
//   );
// }

// export default AccessTokenHook;
