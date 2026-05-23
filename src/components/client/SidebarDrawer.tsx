import React from "react";
import { Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PATHS } from "@/routes/paths";
import "./SidebarDrawer.css";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: PATHS.CLIENT_HOME, label: "Home", icon: "material-symbols:home" },
    {
      key: PATHS.HISTORY,
      label: "Transaction History",
      icon: "material-symbols:wallet",
    },
    {
      key: "/bidding",
      label: "Bidding History",
      icon: "material-symbols:list-alt",
    },
    {
      key: "/starline-bid",
      label: "Starline Bid History",
      icon: "material-symbols:list-alt",
    },
    { key: "/fund", label: "Fund History", icon: "material-symbols:payments" },
    {
      key: "/notifications",
      label: "Notifications",
      icon: "material-symbols:notifications",
    },
    {
      key: "/winners",
      label: "Top Winners",
      icon: "material-symbols:emoji-events",
    },
    {
      key: "/starline-winners",
      label: "Starline Winners",
      icon: "material-symbols:emoji-events",
    },
    {
      key: "/rates",
      label: "Game Rates",
      icon: "material-symbols:trending-up",
    },
    {
      key: "download",
      label: "Download App",
      icon: "material-symbols:download",
    },
  ];

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={open}
      width={260}
      closable={false}
      styles={{ body: { padding: 0 } }}
      className="sidebar-drawer"
    >
      {/* Header */}
      <div className="sidebar-header">
        <div className="user-info">
          <h2>Hello User</h2>
          <p>Welcome Back</p>
        </div>
        <div className="close-sidebar-btn" onClick={onClose}>
          <Icon icon="material-symbols:arrow-back" className="icon-size" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu-list">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-menu-item ${location.pathname === item.key ? "active" : ""}`}
            onClick={() => {
              if (item.key !== "download") {
                navigate(item.key);
              }
              onClose();
            }}
          >
            <Icon icon={item.icon} className="sidebar-menu-icon" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-divider" />

      {/* Footer Buttons */}
      <div className="sidebar-footer">
        <button
          className="sidebar-btn btn-profile"
          onClick={() => {
            navigate(PATHS.PROFILE);
            onClose();
          }}
        >
          My Profile
        </button>
        <button
          className="sidebar-btn btn-logout"
          onClick={() => {
            navigate(PATHS.SIGN_IN);
            onClose();
          }}
        >
          Logout
        </button>
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;
