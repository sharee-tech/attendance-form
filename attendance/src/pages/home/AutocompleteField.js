import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";

function AutocompleteField({ control, errors, options }) {
  return (
    <div className="name-select">
      <Controller
        name="user"
        control={control}
        render={({ field }) => {
          const { onChange, value } = field;
          return (
            <Autocomplete
              options={options || []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300, margin: "30px auto" }}
              getOptionLabel={(option) =>
                option.full_name ? option.full_name : ""
              }
              onChange={(event, value) => {
                onChange(value);
              }}
              value={value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select name"
                  error={errors.user ? true : false}
                />
              )}
            />
          );
        }}
      />
      {errors.user?.message && (
        <span className="span-alert">Please select your name.</span>
      )}
    </div>
  );
}

export default AutocompleteField;
