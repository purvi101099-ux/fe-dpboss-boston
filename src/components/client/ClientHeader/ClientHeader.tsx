import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { TOKEN } from "@/utils/constants";
import { useWallet } from "@/hooks/useWallet";
import NewsMarquee from "../NewsMarquee";

interface ClientHeaderProps {
  onMenuClick: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoggedIn = !!localStorage.getItem(TOKEN);
  const isHome = pathname === "/client/home";
  const { data: wallet, isLoading, refetch } = useWallet();

  // useEffect(() => {
  //   refetch();
  // }, [pathname]);

  return (
    <>
      <header className="client-header">
        <div className="header-left">
          <Icon
            icon="fa:align-left"
            className="menu-trigger-icon"
            onClick={onMenuClick}
          />
          <span className="brand-name">Satta8055</span>
        </div>

        {isLoggedIn ? (
          <div className="header-user-area">
            {/* Wallet balance chip */}
            <div className="header-wallet-chip">
              <Icon icon="fa:inr" className="wallet-icon" />
              <span className="wallet-amount">
                {isLoading ? "..." : wallet?.points || 0}
              </span>
            </div>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/sign-in")}>
            <Icon icon="fa:sign-in" className="icon-size" /> Login
          </button>
        )}
      </header>
      {isHome && <NewsMarquee />}
    </>
  );
};

export default ClientHeader;
