import React from "react";
import { Space, Typography, Grid } from "antd";
import CommonButton from "./commonButton";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface CommonPageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  showButton?: boolean;
}

const CommonPageHeader: React.FC<CommonPageHeaderProps> = ({
  title,
  icon,
  buttonLabel,
  buttonIcon,
  onButtonClick,
  showButton = true,
}) => {
  const screens = useBreakpoint();
  const isMobile =
    screens.md === false || (Object.keys(screens).length > 0 && !screens.md);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <Space size="small">
        {icon && (
          <div
            style={{
              fontSize: "24px",
              color: "var(--pink-logo)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
        )}
        <Title level={isMobile ? 4 : 2} style={{ margin: 0 }}>
          {title}
        </Title>
      </Space>

      {showButton && buttonLabel && (
        <CommonButton
          label={buttonLabel}
          icon={buttonIcon}
          onClick={onButtonClick}
        />
      )}
    </div>
  );
};

export default CommonPageHeader;
