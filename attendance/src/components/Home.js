import React, { useEffect, useState } from "react";
import Copyright from "./Copyright";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createClient } from "@supabase/supabase-js";
import Header from "./Header";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Home() {
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [members, setMembers] = useState([]);

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
    console.log(data);
    setAbsences();
    setSelectedDate([]);
    setSelectedName("");
    return alert("Dates submitted successfully!");
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  function formatSavedDates(allDates) {
    const formattedDates = [];
    allDates.map((date) => {
      formattedDates.push(date.year + "-" + date.month.number + "-" + date.day);
    });
    setSelectedDate(formattedDates);
    console.log(formattedDates);
  }

  return (
    <>
      <Header />
      <h1>Choir Attendance</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          onChange={(event, newValue) => {
            setSelectedName(newValue);
          }}
          value={selectedName}
          disablePortal
          id="combo-box-demo"
          // options={choirRoster}
          options={members.map((member) => member.name)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Your Name" />
          )}
        />
        <h3>Indicate which day(s) you will be absent</h3>
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

        <button type="submit" className="button">
          Submit
        </button>
      </form>

      <footer>
        <Copyright />
      </footer>
    </>
  );
}

export default Home;
