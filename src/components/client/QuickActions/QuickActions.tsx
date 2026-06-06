import React from "react";
import { Button, Row, Col } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import "./QuickActions.css";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actionItems = [
    {
      label: "Support",
      icon: "fa:comments",
      onClick: () => navigate(PATHS.SUPPORT),
    },
    {
      label: "Add Money",
      icon: "fa:money",
      onClick: () => navigate(PATHS.ADD_FUND),
    },
    {
      label: "Withdraw",
      icon: "fa:credit-card",
      onClick: () => navigate(PATHS.WITHDRAW_FUND),
    },
  ];

  return (
    <>
      {/* Top Buttons */}
      <Row gutter={[8, 8]} className="quick-top-buttons">
        <Col span={12}>
          <Button block className="quick-primary-btn">
            Play Now
          </Button>
        </Col>
        <Col span={12}>
          <Button block className="quick-primary-btn">
            How to Play
          </Button>
        </Col>
      </Row>

      {/* Action Items */}
      <div className="quick-action-row">
        {actionItems.map((item, index) => (
          <div key={index} className="quick-action-item" onClick={item.onClick}>
            <div className="quick-action-icon-wrap">
              <Icon icon={item.icon} width="12" style={{ color: "#333" }} />
            </div>
            <span className="quick-action-label">{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuickActions;
