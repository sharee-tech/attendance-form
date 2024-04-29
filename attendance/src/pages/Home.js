import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { supabase } from "../config/supabaseClient";
import SuccessAlert from "../common/SuccessAlert";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Home() {
  const [selectedDate, setSelectedDate] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDates, setUserDates] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const validationSchema = Yup.object().shape({
    user: Yup.object().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    date: Yup.mixed().required(),
  });

  async function getMembers() {
    const { data } = await supabase.from("members").select();
    setMembers(data);
  }

  async function setAbsences(data) {
    const insertData = selectedDate.map((date) => ({
      user_id: null,
      email: data.email,
      name: data.user.full_name,
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
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      user: null,
      email: null,
      date: null,
    },
  });

  let userObj = watch("user");

  useEffect(() => {
    if (userObj) {
      let userEmail = userObj.email;
      if (userEmail) {
        setValue("email", userEmail, { shouldDirty: true });
      }
    }
  }, [userObj, setValue]);

  const onSubmit = async (data) => {
    await setAbsences(data);
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

  function formatDatesUser(allDates) {
    const formattedDates = [];
    allDates.map((date) => {
      formattedDates.push(date.month.number + "-" + date.day + "-" + date.year);
    });
    setUserDates(formattedDates);
  }

  const sortedOptions = [...members]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .map((member) => ({
      id: member.id,
      full_name: `${member.first_name} ${member.last_name}`,
      email: member.email,
    }));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="page-container">
        <h1>Choir Attendance</h1>
        <div className="name-select">
          <Controller
            name="user"
            control={control}
            render={({ field }) => {
              const { onChange, value } = field;
              return (
                <Autocomplete
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={sortedOptions}
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
        </div>
        {errors.user?.message && (
          <span className="span-alert">Please select your name.</span>
        )}

        <div style={{ display: "none" }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              const { onChange, value } = field;
              return <TextField id="email" label="Hidden Email" />;
            }}
          />
        </div>

        <p>Indicate which day(s) you will be absent</p>
        <div className="select-dates">
          <SuccessAlert
            open={open}
            setOpen={setOpen}
            mode={"dates"}
            dates={userDates}
          />

          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => {
              const { onChange, value } = field;
              return (
                <Calendar
                  multiple
                  value={value}
                  onChange={(date) => {
                    formatSavedDates(date);
                    formatDatesUser(date);
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
              );
            }}
          />
          {errors.date && (
            <span className="span-alert">
              Please select the day(s) you will be absent from choir.
            </span>
          )}
        </div>
        <div>
          <button className="cstm-button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}
export default Home;
