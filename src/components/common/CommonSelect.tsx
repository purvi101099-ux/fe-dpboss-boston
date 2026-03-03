import React from "react";
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface OptionType {
  label: string;
  value: string | number;
}

interface CommonSelectProps {
  name: string;
  options: OptionType[];
  placeholder?: string;
  showSearch?: boolean;
  style?: React.CSSProperties;
  loading?: boolean;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  name,
  options,
  placeholder = "Select an option",
  showSearch = true,
  style,
  loading,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="common-select-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || undefined}
            showSearch={showSearch}
            placeholder={placeholder}
            loading={loading}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={options}
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

export default CommonSelect;
