import Header from "./Header";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Members() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const { data } = await supabase
      .from("members")
      .select()
      .order("first_name", { ascending: true });
    setMembers(data);
  }

  async function deleteMember(id) {
    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting member:", error.message);
    } else {
      setMembers(members.filter((member) => member.id !== id));
    }
  }

  return (
    <>
      <Header />
      <h1>Members</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Delete</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Section</th>
          </tr>
        </thead>
        {members.map((member) => (
          <tbody>
            <tr key={member.id}>
              <td>
                <RemoveCircleOutlineIcon
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      deleteMember(member.id);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* <ul className="absences-list">
        {members.map((member) => (
          <li key={member.id} style={{ listStyleType: "none" }}>
            <RemoveCircleOutlineIcon
              onClick={() => {
                if (window.confirm("Are you sure?")) {
                  deleteMember(member.id);
                }
              }}
              style={{ cursor: "pointer" }}
            />
            {member.first_name}
          </li>
        ))}
      </ul> */}
    </>
  );
}
