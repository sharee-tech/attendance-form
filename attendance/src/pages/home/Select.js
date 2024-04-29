import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
export default function Select(options, control, errors) {
  return (
    <Controller
      name="user"
      control={control}
      render={({ field }) => {
        const { onChange, value } = field;
        return (
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={options}
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
  );
}
