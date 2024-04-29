//   name="date"
import { Calendar } from "react-multi-date-picker";
export default function AbsenceCalender(
  value,
  formatSavedDates,
  formatDatesUser,
  field
) {
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
        let notselectable = [1, 2, 4, 5, 6].includes(date.weekDay.index);

        if (notselectable)
          return {
            disabled: true,
            style: { color: "#ccc" },
            onClick: () => alert("You must select a Sunday or a Wednesday"),
          };
      }}
    />
  );
}
