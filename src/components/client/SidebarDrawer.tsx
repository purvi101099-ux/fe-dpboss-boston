import React from "react";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeFilled,
  UserOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeFilled />, path: "/client/home" },
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
      path: "/profile",
    },
    {
      key: "support",
      label: "Support",
      icon: <CustomerServiceOutlined />,
      path: "/support",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      path: "/sign-in",
    },
  ];

  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={onClose}
      open={open}
      width={280}
      styles={{ body: { padding: 0 } }}
    >
      <div className="drawer-content">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className="drawer-item"
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
            style={{
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <span style={{ fontSize: "18px", color: "#870000" }}>
              {item.icon}
            </span>
            <span style={{ fontWeight: "500" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;
