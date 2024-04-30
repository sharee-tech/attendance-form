import React from "react";
import { Calendar } from "react-multi-date-picker";
import { Controller } from "react-hook-form";

function DatePickerField({ control, errors }) {
  return (
    <div className="select-dates">
      <Controller
        control={control}
        name="date"
        rules={{ required: true }}
        render={({ field }) => (
          <Calendar
            multiple
            value={field.value}
            onChange={(date) => field.onChange(date)}
            format="YYYY-MM-DD"
            monthYearSeparator="|"
            mapDays={({ date }) => {
              let notselectable = [1, 2, 4, 5, 6].includes(date.weekDay.index);

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
  );
}

export default DatePickerField;
