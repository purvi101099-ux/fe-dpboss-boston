import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "@/components/client/ClientHeader";
import SidebarDrawer from "@/components/client/SidebarDrawer";
import BottomNavbar from "@/components/client/BottomNavbar";
import "./ProtectedLayout.css";

const ProtectedLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="client-layout">
      <ClientHeader onMenuClick={toggleDrawer} />

      <SidebarDrawer open={drawerVisible} onClose={toggleDrawer} />

      <main className="client-content">
        <Outlet />
      </main>

      <BottomNavbar />

      {/* Floating Action Button (WhatsApp) */}
      <div
        className="floating-whatsapp"
        onClick={() => window.open("https://wa.me/your-number", "_blank")}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default ProtectedLayout;
