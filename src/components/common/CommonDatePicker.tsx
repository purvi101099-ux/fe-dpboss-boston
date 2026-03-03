import React from "react";
import { DatePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

interface CommonDatePickerProps {
  name: string;
  placeholder?: string;
  format?: string;
  style?: React.CSSProperties;
}

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  name,
  placeholder = "Select date",
  format = "DD-MM-YYYY",
  style,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="common-datepicker-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value ? moment(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toDate() : null)}
            placeholder={placeholder}
            format={format}
            status={errorMessage ? "error" : ""}
            style={{ width: "100%", ...style }}
          />
        )}
      />
      {errorMessage && (
        <p style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CommonDatePicker;
