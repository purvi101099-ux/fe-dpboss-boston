import React from "react";
import { Button, Row, Col } from "antd";
import { Icon } from "@iconify/react";

const QuickActions: React.FC = () => {
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

  const actionBtnStyle: React.CSSProperties = {
    flex: 1,
    background: "#ffcc99",
    border: "none",
    fontSize: "11px",
    height: "36px",
    borderRadius: "20px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    padding: "0 8px",
  };

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
        <Button
          icon={<Icon icon="material-symbols:chat" width="16" />}
          style={actionBtnStyle}
        >
          Support
        </Button>
        <Button
          icon={<Icon icon="material-symbols:add-card" width="16" />}
          style={actionBtnStyle}
        >
          Add Money
        </Button>
        <Button
          icon={<Icon icon="material-symbols:upload" width="16" />}
          style={actionBtnStyle}
        >
          Withdraw
        </Button>
      </div>
    </>
  );
};

export default QuickActions;
