import React from "react";
import Header from "./Header";
import { useState } from "react";
import SuccessAlert from "./Success";
import RosterTable from "./RosterTable";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { supabase } from "../config/supabaseClient";

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

  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Header />
      <h1>Roster</h1>
      <RosterTable memberData={members} setMemberData={setMembers} />
      <SuccessAlert open={open} setOpen={setOpen} mode={"add"} />
      <h3 className="add-member-heading">Add a new member</h3>
      <hr style={{ maxWidth: "250px", margin: "auto" }}></hr>

      <form onSubmit={handleSubmit} className="add-member-form">
        <div className="add-member-text-group">
          <div className="add-member-field-group">
            <label>First Name</label>
            <input
              className="add-member-input"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="add-member-field-group">
            <label>Last Name</label>
            <input
              className="add-member-input"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <Controller
          className=""
          control={control}
          name="selected-section"
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              onChange={(event, newValue) => {
                field.onChange(newValue);
                setSection(newValue);
              }}
              value={section}
              disablePortal
              id=""
              options={[
                "Soprano",
                "Alto",
                "Tenor",
                "Bass",
                "Conductor",
                "Accompanist",
                "Other",
              ]}
              sx={{ width: 320 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a section"
                  error={!!errors.section}
                  helperText={errors.selectedName && "Please select a section."}
                />
              )}
            />
          )}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
