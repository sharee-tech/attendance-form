import * as React from "react";
import Copyright from "./components/Copyright";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DatePicker, { Calendar } from "react-multi-date-picker";

const choirData = [
  { id: 1, firstName: "Sharee", lastName: "Thompson" },
  { id: 2, firstName: "Matthew", lastName: "Thompson" },
  { id: 3, firstName: "Tepring", lastName: "Crocker" },
];

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    alert("hit");
  }

  function Dropdown() {
    const dropdownOptions = choirData.map((option) => (
      <option
        key={`${option.id}`}
        value={`${option.firstName}-${option.lastName}`}
      >
        {`${option.firstName} ${option.lastName}`}
      </option>
    ));

    return dropdownOptions;
  }

  return (
    <>
      <h1>Choir Attendance</h1>

      <form onSubmit={handleSubmit}>
        <h2>Select your name</h2>

        <select>
          <option value="" disabled selected></option>
          <Dropdown />
        </select>

        <h2>Indicate which day(s) you will be absent</h2>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </LocalizationProvider> */}
        <Calendar multiple value={values} onChange={setValues} />
        {/* <span>Add additional days ➕</span> */}
        {/* <p>{selectedDate.format("MM/DD/YY")}</p> */}

        <button className="button">Submit</button>
      </form>
      <footer>
        <Copyright />
      </footer>
    </>
  );
}

export default App;
