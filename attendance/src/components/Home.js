import React, { useEffect, useState } from "react";
import Copyright from "./Copyright";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Header from "./Header";
import { supabase } from "../config/supabaseClient";
import SuccessAlert from "./Success";

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
    try {
      const { data, error } = await supabase
        .from("absences")
        .insert(insertData);
      if (error) {
        console.error("Error inserting absences:", error.message);
      } else {
        console.log("Absences inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting absences:", error.message);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await setAbsences();
    setSelectedDate([]);
    setSelectedName("");
    setOpen(true);
    reset(); //Reset the form to re-validate selectedName field
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
              options={sortedOptions}
              sx={{ width: 300, margin: "30px auto" }}
              autocomplete="off"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Your Name"
                  autocomplete="off"
                />
              )}
            />
          )}
        />
        {errors.selectedName && <span>Please select your name.</span>}

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
