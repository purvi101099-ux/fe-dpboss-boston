import React from "react";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ClientHeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="client-header">
      <div className="header-left">
        <MenuOutlined className="menu-trigger" onClick={onMenuClick} />
        <span className="brand-name">Dpboss Play</span>
      </div>
      <button className="login-btn" onClick={() => navigate("/signin")}>
        <LoginOutlined /> Login
      </button>
    </header>
  );
};

export default ClientHeader;
