import React from "react";
import { Button, Row, Col } from "antd";
import {
  MessageOutlined,
  WalletOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const QuickActions: React.FC = () => {
  const primaryBtnStyle: React.CSSProperties = {
    height: "60px",
    background: "#ffcc99",
    border: "none",
    fontWeight: "600",
    borderRadius: "12px",
    fontSize: "16px",
    color: "#000080", // Blue text as seen in screenshot
  };

  const actionBtnStyle: React.CSSProperties = {
    flex: 1,
    background: "#ffcc99",
    border: "none",
    fontSize: "12px",
    height: "38px",
    borderRadius: "20px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
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
        <Button icon={<MessageOutlined />} style={actionBtnStyle}>
          Support
        </Button>
        <Button icon={<WalletOutlined />} style={actionBtnStyle}>
          Add Money
        </Button>
        <Button icon={<DownloadOutlined />} style={actionBtnStyle}>
          Withdraw
        </Button>
      </div>
    </>
  );
};

export default QuickActions;
