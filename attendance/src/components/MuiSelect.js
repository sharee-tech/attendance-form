import React from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MuiSelect() {
  const { handleSubmit: submitForm, control } = useForm();
  const options = [
    {
      id: 1,
      label: "Alex Goering",
      email: "Alex.Goering@reecenichols.com",
    },
    {
      id: 2,
      label: "Andy Berry",
      email: "Andyberry59@gmail.com",
    },
    {
      id: 3,
      label: "Anita Tally",
      email: "anitatally@gmail.com",
    },
  ];

  const handleSubmit = async () => {
    let data;
    // async request which may result in an error
    try {
      // data = await fetch()
      console.log(data); // Access data here
    } catch (e) {
      // handle your error
    }
    console.log(data); // Access data here as well
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <Controller
          control={control}
          name="test"
          render={({ field }) => ( */}
        <Autocomplete
          //   {...field}
          disablePortal
          id="demo"
          options={options}
          sx={{ width: 300 }}
          //   value={field.value}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
        {/* )} */}
        {/* /> */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
