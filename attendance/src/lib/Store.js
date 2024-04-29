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
