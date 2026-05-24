import React from "react";
import MenuListItem from "@/components/client/MenuListItem";

const Support: React.FC = () => {
  const handleWhatsAppFund = () => {
    window.open(
      "https://wa.me/your-number?text=Add%20Fund%20Request",
      "_blank",
    );
  };

  const handleWhatsAppOther = () => {
    window.open("https://wa.me/your-number?text=Other%20Issues", "_blank");
  };

  const handleTelegram = () => {
    window.open("https://t.me/your-channel", "_blank");
  };

  return (
    <div className="support-page">
      {/* Each item in its own bordered card */}
      <MenuListItem
        icon="mdi:whatsapp"
        label="Whatsapp Chat (Add Fund)"
        onClick={handleWhatsAppFund}
        divider={false}
        showChevron={false}
      />

      <MenuListItem
        icon="mdi:whatsapp"
        label="Whatsapp Chat (Other Issues)"
        onClick={handleWhatsAppOther}
        divider={false}
        showChevron={false}
      />

      <MenuListItem
        icon="ic:baseline-telegram"
        label="Telegram Chat"
        onClick={handleTelegram}
        divider={false}
        showChevron={false}
      />

      {/* Info note */}
      <p className="support-note">
        Please use <strong>Telegram</strong> for a secure and safe chat
        experience.
      </p>
    </div>
  );
};

export default Support;
