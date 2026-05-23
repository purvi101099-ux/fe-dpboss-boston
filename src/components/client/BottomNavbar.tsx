import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PATHS } from "@/routes/paths";

const BottomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      key: PATHS.CLIENT_HOME,
      label: "Home",
      icon: "material-symbols:home-rounded",
    },
    {
      key: PATHS.HISTORY,
      label: "History",
      icon: "material-symbols:history-rounded",
    },
    {
      key: PATHS.PROFILE,
      label: "Profile",
      icon: "material-symbols:person-rounded",
    },
    {
      key: PATHS.CHANGE_PASSWORD,
      label: "Passbook",
      icon: "material-symbols:book-rounded",
    },
    {
      key: PATHS.MY_BIDS,
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
