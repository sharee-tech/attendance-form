import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { supabase } from "../config/supabaseClient";
import SuccessAlert from "./Success";
import { DevTool } from "@hookform/devtools";

const options = [
  {
    id: 1,
    full_name: "Alex Goering",
    email: "Alex.Goering@reecenichols.com",
  },
  {
    id: 2,
    full_name: "Andy Berry",
    email: "Andyberry59@gmail.com",
  },
  {
    id: 3,
    full_name: "Anita Tally",
    email: "anitatally@gmail.com",
  },
];

function Home() {
  const [selectedDate, setSelectedDate] = useState([]);
  // const [selectedName, setSelectedName] = useState(null);
  // const [value, setValue] = useState(options[0].id);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDates, setUserDates] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const { data } = await supabase.from("members").select();
    setMembers(data);
  }

  async function setAbsences(data) {
    const insertData = selectedDate.map((date) => ({
      user_id: null,
      email: data.email,
      name: data.name.full_name,
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
  } = useForm();

  let userObj = watch("name");
  console.log(userObj);

  useEffect(() => {
    if (userObj) {
      let userEmail = userObj.email;
      if (userEmail) {
        setValue("email", userEmail, { shouldDirty: true });
      }
    }
  }, [userObj, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    await setAbsences(data);
    setOpen(true);
    // setSelectedDate([]);
    // setSelectedName("");
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

  // const sortedOptions = [...members]
  //   .sort((a, b) => a.first_name.localeCompare(b.first_name))
  //   .map((member) => `${member.first_name} ${member.last_name}`);

  const sortedOptions = [...members]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .map((member) => ({
      id: member.id,
      full_name: `${member.first_name} ${member.last_name}`,
      email: member.email,
    }));

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="form-home"
        className="page-container"
      >
        <h1>Choir Attendance</h1>
        {/* <div>{watch("name")}</div> */}
        <div className="name-select">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              const { onChange } = field;
              return (
                <Autocomplete
                  // value={
                  //   value
                  //     ? options.find((option) => {
                  //         return value === option.full_name;
                  //       }) ?? null
                  //     : null
                  // }
                  // isOptionEqualToValue={(option, value) =>
                  //   option.id === value.id
                  // }
                  options={options}
                  sx={{ width: 300, margin: "30px auto" }}
                  getOptionLabel={(item) =>
                    item.full_name ? item.full_name : ""
                  }
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select name" />
                  )}
                />
              );
            }}
          />
        </div>
        {errors.selectedName && (
          <span className="span-alert">Please select your name.</span>
        )}

        <div /*style={{ display: "hidden" }}*/>
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
            render={({ field }) => (
              <Calendar
                multiple
                value={selectedDate}
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
            )}
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
