import React, { useEffect, useState } from "react";
import Copyright from "./Copyright";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createClient } from "@supabase/supabase-js";
import Header from "./Header";

import SuccessAlert from "./Success";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Home() {
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [members, setMembers] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const { data } = await supabase.from("members").select();
    setMembers(data);
  }

  async function setAbsences() {
    const insertData = selectedDate.map((date) => ({
      name: selectedName,
      date: date,
    }));
    const { data, error } = await supabase.from("absences").insert(insertData);
    if (error) {
      console.error("Error inserting absences:", error.message);
    } else {
      console.log("Absences inserted successfully:", data);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setAbsences();
    setSelectedDate([]);
    setSelectedName("");
    setOpen(true);
  };

  function formatSavedDates(allDates) {
    const formattedDates = [];
    allDates.map((date) => {
      formattedDates.push(date.year + "-" + date.month.number + "-" + date.day);
    });
    setSelectedDate(formattedDates);
  }

  const sortedOptions = [...members]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .map((member) => `${member.first_name} ${member.last_name}`);

  return (
    <>
      <Header />
      <h1>Choir Attendance</h1>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <Controller
          control={control}
          name="selectedName"
          rules={{ required: true }}
          autocomplete="off"
          render={({ field }) => (
            <Autocomplete
              onChange={(event, newValue) => {
                field.onChange(newValue);
                setSelectedName(newValue);
              }}
              value={selectedName}
              disablePortal
              id="combo-box-demo"
              // options={members.map(
              //   (member) => `${member.first_name} ${member.last_name}`
              // )}
              options={sortedOptions}
              sx={{ width: 300, margin: "30px auto" }}
              autocomplete="off"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Your Name"
                  // error={!!errors.selectedName}
                  // helperText={errors.selectedName && ""}
                  autocomplete="off"
                />
              )}
            />
          )}
        />
        {errors.selectedName && <span>Please select your name.</span>}

        {/* <Controller
          control={control}
          name="selectedName"
          rules={{ required: true }}
          render={({ field }) => (
            <div className="dropdown">
              <input
                type="text"
                onChange={(event) => {
                  const newValue = event.target.value;
                  field.onChange(newValue);
                  setSelectedName(newValue);
                }}
                value={selectedName}
                placeholder="Select your name"
                // list="names"
                className="dropbtn"
              />
              <datalist className="dropdown-content">
                {members.map((member, index) => (
                  <option
                    key={index}
                    value={`${member.first_name} ${member.last_name}`}
                    onClick={() =>
                      setSelectedName(
                        `${member.first_name} ${member.last_name}`
                      )
                    }
                  >{`${member.first_name} ${member.last_name}`}</option>
                ))}
              </datalist>
              {errors.selectedName && (
                <span>Please enter or select your name.</span>
              )}
            </div>
          )}
        /> */}
        <div className="select-dates">
          <h3>Indicate which day(s) you will be absent</h3>
          <SuccessAlert open={open} setOpen={setOpen} mode={"dates"} />

          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => (
              <Calendar
                multiple
                value={selectedDate}
                onChange={(date) => {
                  formatSavedDates(date);
                  field.onChange(date);
                }}
                format="YYYY-MM-DD"
                monthYearSeparator="|"
                mapDays={({ date }) => {
                  let notselectable = [1, 2, 4, 5, 6].includes(
                    date.weekDay.index
                  );

                  if (notselectable)
                    return {
                      disabled: true,
                      style: { color: "#ccc" },
                      onClick: () =>
                        alert("You must select a Sunday or a Wednesday"),
                    };
                }}
              />
            )}
          />
          {errors.date && (
            <span>Please select the day(s) you will be absent from choir.</span>
          )}
          <button type="submit">Submit</button>
        </div>
      </form>

      <footer>
        <Copyright />
      </footer>
    </>
  );
}

export default Home;
