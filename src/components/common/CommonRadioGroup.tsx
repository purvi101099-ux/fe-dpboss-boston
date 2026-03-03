import React from "react";
import { Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { RadioGroupProps } from "antd";

interface RadioOption {
  label: string;
  value: any;
}

interface CommonRadioGroupProps extends Omit<RadioGroupProps, "status"> {
  name: string;
  options: RadioOption[];
}

const CommonRadioGroup: React.FC<CommonRadioGroupProps> = ({
  name,
  options,
  optionType = "default",
  buttonStyle = "solid",
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
          <Radio.Group
            {...field}
            optionType={optionType}
            buttonStyle={buttonStyle}
            {...rest}
          >
            {options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
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

export default CommonRadioGroup;
