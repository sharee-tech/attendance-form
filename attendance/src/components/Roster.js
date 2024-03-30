import React from "react";
import Header from "./Header";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SuccessAlert from "./Success";
import RosterTable from "./RosterTable";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Roster() {
  const [members, setMembers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState("");
  const [open, setOpen] = React.useState(false);

  async function getMembers() {
    const { data } = await supabase
      .from("members")
      .select()
      .order("first_name", { ascending: true });
    setMembers(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember();
    setFirstName("");
    setLastName("");
    setSection("");
    setOpen(true);
  };

  async function addMember() {
    const { error } = await supabase
      .from("members")
      .insert({ first_name: firstName, last_name: lastName, section: section });
    if (error) {
      console.error("Error inserting absences:", error.message);
    } else {
      getMembers();
    }
  }

  return (
    <>
      <SuccessAlert open={open} setOpen={setOpen} mode={"add"} />
      <Header />
      <h1>Roster</h1>
      <h3>Add a member to the choir roster</h3>
      <form onSubmit={handleSubmit} className="add-member">
        <div>
          <label>First Name</label>
          <input
            className="add-member-field"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="add-member-field"
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Section</label>
          <select
            className="add-member-field"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option value="Soprano">Soprano</option>
            <option value="Alto">Alto</option>
            <option value="Tenor">Tenor</option>
            <option value="Bass">Bass</option>
            <option value="Organist">Organist</option>
            <option value="Conductor">Conductor</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <RosterTable memberData={members} setMemberData={setMembers} />
    </>
  );
}
