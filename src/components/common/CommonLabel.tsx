import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface CommonLabelProps {
  label: string;
  required?: boolean;
  style?: React.CSSProperties;
}

const CommonLabel: React.FC<CommonLabelProps> = ({
  label,
  required = false,
  style,
}) => {
  return (
    <div style={{ marginBottom: "8px", ...style }}>
      <Text strong style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.85)" }}>
        {label}
        {required && (
          <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
        )}
      </Text>
    </div>
  );
};

export default CommonLabel;
