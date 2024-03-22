import React, { useState } from "react";
import Copyright from "./components/Copyright";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import { Dropdown } from "primereact/dropdown";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const choirRoster = ["Sharee Thompson", "Matthew Thompson"];

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const onSubmit = (data) => {
    console.log(data);
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
      <h1>Choir Attendance</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          onChange={(event, newValue) => {
            setSelectedName(newValue);
          }}
          value={selectedName}
          disablePortal
          id="combo-box-demo"
          options={choirRoster}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Your Name" />
          )}
        />
        {/* <select value={selectedName} onChange={handleNameChange}>
          <option value="" disabled>
            Select Name
          </option>
          {choirData.map((option) => (
            <option
              key={option.id}
              value={`${option.firstName} ${option.lastName}`}
            >
              {`${option.firstName} ${option.lastName}`}
            </option>
          ))}
        </select> */}

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

export default App;
