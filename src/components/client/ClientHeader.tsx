import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { TOKEN } from "@/utils/constants";
import NewsMarquee from "./NewsMarquee";

interface ClientHeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoggedIn = !!localStorage.getItem(TOKEN);
  const isHome = pathname === "/client/home";

  return (
    <>
      <header className="client-header">
        <div className="header-left">
          <Icon
            icon="heroicons-outline:menu-alt-1"
            className="menu-trigger-icon"
            onClick={onMenuClick}
          />
          <span className="brand-name">Dpboss Play</span>
        </div>

        {!isLoggedIn ? (
          <div className="header-user-area">
            {/* Wallet balance chip */}
            <div className="header-wallet-chip">
              <Icon icon="mdi:currency-inr" className="wallet-icon" />
              <span className="wallet-amount">0</span>
            </div>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/signin")}>
            <Icon icon="material-symbols:login" className="icon-size" /> Login
          </button>
        )}
      </header>
      {isHome && <NewsMarquee />}
    </>
  );
};

export default ClientHeader;
