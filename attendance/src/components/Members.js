import React from "react";
// import Header from "./Header";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import SuccessAlert from "./Success";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Members() {
  const [members, setMembers] = useState([]);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [section, setSection] = useState("");
  // const [open, setOpen] = React.useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // addMember();
    getMembers();
    // setFirstName("");
    // setLastName("");
    // setSection("");
    // setOpen(true);
    // alert("Submitted successfully!");
  };

  // async function addMember() {
  //   const { error } = await supabase
  //     .from("members")
  //     .insert({ first_name: firstName, last_name: lastName, section: section });
  //   if (error) {
  //     console.error("Error inserting absences:", error.message);
  //   } else {
  //     console.log("Absences inserted successfully");
  //   }
  // }

  return (
    <>
      <table className="member-table">
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
              <td>{member.section}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
