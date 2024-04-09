import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

export default function AccessProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function getProfiles() {
      try {
        const { data } = await supabase.from("profiles").select();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }

    getProfiles();
  }, []);

  useEffect(() => {
    console.log(profiles);
  }, [profiles]); // Add profiles as a dependency

  return (
    <div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <p>UUID: {profile.email}</p>
          <p>UUID: {profile.user_id}</p>
          <p>Is Admin: {profile.is_admin ? "Yes" : "No"}</p>
          <p>Level: {profile.level || "Unknown"}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
}
