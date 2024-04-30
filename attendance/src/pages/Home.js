import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AutocompleteField from "./home/AutocompleteField";
import DatePickerField from "./home/DatePickerField";
import { useStore } from "../lib/Store";
import { setAbsences } from "../lib/Store";
import { validationSchema } from "../util/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import SuccessAlert from "../common/SuccessAlert";
import { formatSelectedDates } from "../util/helpers";
import { formatUserDates } from "../util/helpers";
import { getSortedOptions } from "../util/helpers"; // Import the function

function Home() {
  const { members } = useStore();
  const [open, setOpen] = useState(false);
  const [userDates, setUserDates] = useState([]);
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

  const sortedOptions = getSortedOptions(members); // Use the function to get sorted options

  const onSubmit = async (data) => {
    data.selectedDates = formatSelectedDates(data.date); // Format selected dates
    await setAbsences(data);
    setOpen(true);
    reset(); //Reset the form to re-validate selectedName field
  };

  let userObj = watch("user");
  let dateObj = watch("date");

  useEffect(() => {
    if (userObj) {
      let userEmail = userObj.email;
      if (userEmail) {
        setValue("email", userEmail, { shouldDirty: true });
      }
    }
  }, [userObj, setValue]);

  useEffect(() => {
    if (dateObj) {
      let dates = dateObj;
      let formattedDates = formatUserDates(dates);
      if (formattedDates) {
        setUserDates(formattedDates);
      }
    }
  }, [dateObj, setUserDates]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="page-container">
      <h1>Choir Attendance</h1>
      <AutocompleteField
        control={control}
        errors={errors}
        options={sortedOptions}
      />
      <SuccessAlert
        open={open}
        setOpen={setOpen}
        mode={"dates"}
        dates={userDates}
      />
      <h3>Indicate which day(s) you will be absent</h3>
      <DatePickerField control={control} errors={errors} />
      <div>
        <button className="cstm-button" type="submit">
          Submit
        </button>
      </div>
      <DevTool control={control} />
    </form>
  );
}

export default Home;
