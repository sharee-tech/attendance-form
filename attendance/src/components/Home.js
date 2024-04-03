import React, { useEffect, useState } from "react";
import Copyright from "./Copyright";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createClient } from "@supabase/supabase-js";
import Header from "./Header";
import { supabase } from "../config/supabaseClient";
import SuccessAlert from "./Success";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    console.log(data);
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
    console.log(formattedDates);
  }

  return (
    <>
      <SuccessAlert open={open} setOpen={setOpen} mode={"dates"} />
      <Header />
      <h1>Choir Attendance</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="select-member">
        <Controller
          control={control}
          name="selectedName"
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              onChange={(event, newValue) => {
                field.onChange(newValue);
                setSelectedName(newValue);
              }}
              value={selectedName}
              disablePortal
              id="combo-box-demo"
              options={members.map(
                (member) => `${member.first_name} ${member.last_name}`
              )}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Your Name"
                  error={!!errors.selectedName}
                  helperText={errors.selectedName && "Please select your name."}
                />
              )}
            />
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
        <button type="submit">Submit</button>
      </form>
      {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
      <footer>
        <Copyright />
      </footer>
    </>
  );
}

export default Home;
