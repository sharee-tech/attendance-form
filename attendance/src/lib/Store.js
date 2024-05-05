import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useStore = (props) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const handleAsync = async () => {
      getMembers(setMembers);
    };
    handleAsync();
  }, []);

  return {
    members,
  };
};

export const getMembers = async (setState) => {
  try {
    const { data } = await supabase.from("members").select();
    if (setState) setState(data);
  } catch (error) {
    console.log("error", error);
  }
};

export async function setAbsences(data, user, full_name, nonadminloggedinuser) {
  // console.log(data);

  const insertData = data.selectedDates.map((date) => ({
    user_id: nonadminloggedinuser ? user.id : null,
    email: nonadminloggedinuser ? user.email : data.email,
    name: nonadminloggedinuser ? full_name : data.user.full_name,
    date: date,
  }));
  try {
    const { data, error } = await supabase.from("absences").insert(insertData);
    if (error) {
      console.error("Error inserting absences:", error.message);
    } else {
      console.log("Absences inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error inserting absences:", error.message);
  }
}
