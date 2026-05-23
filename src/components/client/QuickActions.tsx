import React from "react";
import { Button, Row, Col } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const primaryBtnStyle: React.CSSProperties = {
    height: "60px",
    background: "#ffcc99",
    border: "none",
    fontWeight: "600",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#000080",
    whiteSpace: "normal",
    lineHeight: "1.2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const actionItems = [
    {
      label: "Support",
      icon: "material-symbols:chat",
      onClick: () => navigate(PATHS.SUPPORT),
    },
    {
      label: "Add Money",
      icon: "material-symbols:add-card",
      onClick: () => navigate(PATHS.ADD_FUND),
    },
    {
      label: "Withdraw",
      icon: "material-symbols:upload",
      onClick: () => navigate(PATHS.WITHDRAW_FUND),
    },
  ];

  return (
    <>
      {/* Top Buttons */}
      <Row gutter={[8, 8]} style={{ marginBottom: "16px" }}>
        <Col span={12}>
          <Button block style={primaryBtnStyle}>
            Dpboss Bazar Starline
          </Button>
        </Col>
        <Col span={12}>
          <Button block style={primaryBtnStyle}>
            How to Play
          </Button>
        </Col>
      </Row>

      {/* Action Icons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {actionItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            style={{
              flex: 1,
              background: "var(--bg-primary)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              padding: "6px 0px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: "25px",
                height: "25px",
                background: "var(--bg-gray)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "5px",
              }}
            >
              <Icon icon={item.icon} width="12" style={{ color: "#333" }} />
            </div>
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuickActions;
