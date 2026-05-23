import React from "react";
import "./notification.css";

const Notification: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: "PLAY BIG WIN BIG ????????????",
      description: "SUPER FAST WITHDRAWAL AND SUPER FAST DEPOSIT ????????",
      date: "May 23, 2026 10:54 AM",
    },
    {
      id: 2,
      title: "PLAY BIG WIN BIG ????????????",
      description: "SUPER FAST WITHDRAWAL AND SUPER FAST DEPOSIT ????????",
      date: "May 23, 2026 10:54 AM",
    },
  ];

  return (
    <div className="notification-page">
      <div className="notification-header">
        <h1>Notifications</h1>
      </div>
      <div className="notification-list">
        {notifications.map((item) => (
          <div key={item.id} className="notification-card">
            <h2 className="notification-title">{item.title}</h2>
            <p className="notification-desc">{item.description}</p>
            <div className="notification-date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
