import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

interface CommonButtonProps extends ButtonProps {
  label: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  htmlType = "button",
  className,
  loading,
  disabled,
  block,
  icon,
  style,
  ...rest
}) => {
  return (
    <Button
      type="primary"
      htmlType={htmlType}
      className={className}
      loading={loading}
      disabled={disabled}
      block={block}
      icon={icon}
      style={{
        backgroundColor: "var(--blue-btn)",
        borderColor: "var(--blue-btn)",
        ...style,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CommonButton;
