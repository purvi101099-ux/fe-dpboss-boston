import React from "react";
import { TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { TimePickerProps } from "antd";

interface CommonTimePickerProps extends Omit<TimePickerProps, "status"> {
  name: string;
  label?: string;
  required?: boolean;
}

const CommonTimePicker: React.FC<CommonTimePickerProps> = ({
  name,
  format = "HH:mm",
  style,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="common-input-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            {...field}
            format={format}
            style={{ width: "100%", ...style }}
            status={errorMessage ? "error" : ""}
            {...rest}
          />
        )}
      />
      {errorMessage && (
        <p
          className="helper-text"
          style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CommonTimePicker;
