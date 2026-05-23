import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "@/utils/constants";

interface ClientHeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem(TOKEN);

  return (
    <header className="client-header">
      <div className="header-left">
        <Icon
          icon="heroicons-outline:menu-alt-1"
          className="menu-trigger-icon"
          onClick={onMenuClick}
        />
        <span className="brand-name">Dpboss Play</span>
      </div>

      {true ? (
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
  );
};

export default ClientHeader;
