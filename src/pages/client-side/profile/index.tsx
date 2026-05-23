import React from "react";
import { useNavigate } from "react-router-dom";
import MenuListItem from "@/components/client/MenuListItem";
import { PATHS } from "@/routes/paths";
import "./profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      {/* Menu List */}
      <div className="profile-menu-list">
        <MenuListItem
          icon="mdi:bank-outline"
          label="Bank Details"
          onClick={() => navigate(PATHS.BANK_DETAILS)}
        />
        <MenuListItem
          icon="mdi:lock-reset"
          label="Change Password"
          onClick={() => navigate(PATHS.PASSWORD)}
        />
      </div>
    </div>
  );
};

export default Profile;
