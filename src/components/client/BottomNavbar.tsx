import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const BottomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      key: "/client/home",
      label: "Home",
      icon: "material-symbols:home-rounded",
    },
    {
      key: "/history",
      label: "History",
      icon: "material-symbols:history-rounded",
    },
    {
      key: "/profile",
      label: "Profile",
      icon: "material-symbols:person-rounded",
    },
    {
      key: "/password",
      label: "Passbook",
      icon: "material-symbols:book-rounded",
    },
    {
      key: "/my-bids",
      label: "My Bids",
      icon: "material-symbols:view-list-rounded",
    },
  ];

  return (
    <nav className="bottom-navbar">
      {navItems.map((item) => (
        <div
          key={item.key}
          className={`nav-item ${location.pathname === item.key ? "active" : ""}`}
          onClick={() => navigate(item.key)}
        >
          <Icon icon={item.icon} className="nav-icon icon-size" />
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavbar;
