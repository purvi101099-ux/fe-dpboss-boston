import React from "react";

const NoticeMessage: React.FC = () => {
  return (
    <div className="notice-message-container common-border">
      <h2 className="notice-title">☆ NOTICE ☆</h2>
      <p className="notice-warning">*Important Warning* ⚠️</p>
      <p className="notice-text">
        Number 88781750XX is permanently disconnected / यह नंबर अब बंद हो चुका
        है
      </p>
      <p className="notice-text">
        Do NOT share OTP, password, bank or personal info / कोई भी OTP, पासवर्ड
        या बैंक जानकारी साझा न करें
      </p>
      <p className="notice-text">
        If anyone claims it's DPBOSS number, it is false / यदि कोई इसे DPBOSS
        नंबर बताए तो यह गलत है
      </p>
      <p className="notice-text">
        Use only Admin Panel number / केवल Admin Panel में दिए गए नंबर का ही
        उपयोग करें
      </p>
    </div>
  );
};

export default NoticeMessage;
