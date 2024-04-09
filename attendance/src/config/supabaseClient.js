import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";
// const supabaseRoleKey = process.env.REACT_APP_SUPABASE_ROLE_KEY || "";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
  // supabaseRoleKey
);
