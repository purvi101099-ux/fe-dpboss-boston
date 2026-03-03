import React from "react";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface CommonInputProps {
  name: string;
  placeholder?: string;
  type?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  placeholder,
  type,
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
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              {...field}
              placeholder={placeholder}
              status={errorMessage ? "error" : ""}
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              type={type || "text"}
              status={errorMessage ? "error" : ""}
              style={{ width: "100%" }}
            />
          )
        }
      />

      {errorMessage && <p className="helper-text">{errorMessage}</p>}
    </div>
  );
};

export default CommonInput;
