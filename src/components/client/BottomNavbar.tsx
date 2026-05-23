import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeFilled,
  UnorderedListOutlined,
  UserOutlined,
  LockOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const BottomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "/client/home", label: "Home", icon: <HomeFilled /> },
    { key: "/history", label: "History", icon: <UnorderedListOutlined /> },
    { key: "/profile", label: "Profile", icon: <UserOutlined /> },
    { key: "/password", label: "Passbook", icon: <LockOutlined /> },
    { key: "/my-bids", label: "My Bids", icon: <HistoryOutlined /> },
  ];

  return (
    <nav className="bottom-navbar">
      {navItems.map((item) => (
        <div
          key={item.key}
          className={`nav-item ${location.pathname === item.key ? "active" : ""}`}
          onClick={() => navigate(item.key)}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavbar;
