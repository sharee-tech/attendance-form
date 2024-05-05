import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AutocompleteField from "./home/AutocompleteField";
import DatePickerField from "./home/DatePickerField";
import { useStore } from "../lib/Store";
import { setAbsences } from "../lib/Store";
import { validationSchema } from "../util/validationSchema";
import { validationSchemaAdmin } from "../util/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import SuccessAlert from "../common/SuccessAlert";
import { formatSelectedDates } from "../util/helpers";
import { formatUserDates } from "../util/helpers";
import { getSortedOptions } from "../util/helpers"; // Import the function
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user, auth, role } = useAuth();
  const ADMIN = role === "admin" ? true : false;
  const AUTHREGUSR = !ADMIN && auth;
  const NONAUTHUSR = !auth;

  const getValidationSchema = () =>
    NONAUTHUSR || ADMIN ? validationSchemaAdmin : validationSchema;

  const { members } = useStore();
  const [open, setOpen] = useState(false);
  const [userDates, setUserDates] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(getValidationSchema()),
    defaultValues: {
      user: null,
      email: null,
      date: null,
    },
  });

  const sortedOptions = getSortedOptions(members); // Use the function to get sorted options

  const onSubmit = async (data) => {
    // console.log(data);
    data.selectedDates = formatSelectedDates(data.date); // Format selected dates
    let regusr_fullname = ""; //here in case needed for regusr
    if (AUTHREGUSR) {
      /*need to find full name and provide to setAbsences 
      since regular non-admin users won't have a 
      dropdown select to choose their name*/
      const regusr = members.filter(
        (member) => member.email === user.email //user.email comes from logged in usr session object
      );
      regusr_fullname = `${regusr[0].first_name} ${regusr[0].last_name}`;
    }
    await setAbsences(data, user, regusr_fullname, AUTHREGUSR);
    user && auth ? navigate("/absences") : setOpen(true);
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
      {ADMIN || !auth ? (
        <AutocompleteField
          control={control}
          errors={errors}
          options={sortedOptions}
        />
      ) : (
        <input
          {...register("hidden", {
            value: {
              user_id: "",
              full_name: "",
              email: "",
            },
          })}
          type="hidden"
        />
      )}
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
