import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./bids-details.css";

const BidsDetails: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Get day
      const day = now.getDate();
      
      // Get month name (e.g., "May")
      const month = now.toLocaleString("en-US", { month: "long" });
      
      // Get year
      const year = now.getFullYear();
      
      // Get time component formatted as h:mm:ssa in lowercase without space
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const timeStr = `${hours}:${minutes}:${seconds}${ampm}`;
      
      // Combine: "27 May 2026, 10:20:41pm"
      setCurrentTime(`${day} ${month} ${year}, ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/9893175257", "_blank");
  };

  return (
    <div className="bids-details-container">
      {/* Book Game Action Header */}
      <div className="book-game-header-btn">
        <span>Book Game</span>
      </div>

      {/* Real-time Clock */}
      <div className="bids-details-clock">
        {currentTime || "Loading time..."}
      </div>

      {/* Dk Matka Rates Table */}
      <div className="details-section-wrapper">
        <div className="details-section-header">
          <h2>Dk Matka Rates</h2>
        </div>
        <table className="details-rates-table">
          <tbody>
            <tr>
              <td className="rate-name">Open/Close</td>
              <td className="rate-val">100 Ka 900</td>
            </tr>
            <tr>
              <td className="rate-name">Jodi</td>
              <td className="rate-val">100 Ka 9000</td>
            </tr>
            <tr>
              <td className="rate-name">Sp Pana</td>
              <td className="rate-val">100 Ka 15000</td>
            </tr>
            <tr>
              <td className="rate-name">Dp Pana</td>
              <td className="rate-val">100 Ka 30000</td>
            </tr>
            <tr>
              <td className="rate-name">Tp Pana</td>
              <td className="rate-val">100 Ka 45000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dk Matka Add Money Offers Table */}
      <div className="details-section-wrapper">
        <div className="details-section-header">
          <h2>Dk Matka Add Money Offers</h2>
        </div>
        <table className="details-offers-table">
          <thead>
            <tr>
              <th>Add Money</th>
              <th>Offer</th>
              <th>Extra Money</th>
              <th>Total AddMoney</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rs.5000/-</td>
              <td className="offer-highlight">10%</td>
              <td>500/-</td>
              <td>5500/-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notice Board Area */}
      <div className="details-notice-board">
        <p className="notice-line blue-bold">
          दोस्तों वॉलेट में ऐड मनी ऑफर केवल Rs.5000/- पर है!
        </p>
        <p className="notice-line blue-bold">
          घर में रहे सुरक्षित रहो मास्क हमेशा यूज़ करे!
        </p>
        <p className="notice-line blue-bold font-medium">
          Paytm, Phonepe, GooglePay, Number
        </p>
        <p className="notice-number-highlight">
          9893175257
        </p>
      </div>

      {/* Black Info Banner */}
      <div className="details-black-banner">
        <p>
          Sotta matka is a very basic game where you are required to guess numbers that range between 00 to 99. With a bit of practice, anyone can be an master of Madhur matka.
        </p>
      </div>

      {/* Action/Payment Footer Section */}
      <div className="details-payment-footer">
        <p className="footer-notice-text">
          अगर आप वॉलेट में पैसा डलवाना चाहते है तो नीचे दिए नंबर पर पेमेंट करे-
        </p>
        <p className="footer-notice-subtext">
          पेमेंट कम से कम Rs.1000/- जमा होगा
        </p>
        <p className="footer-payment-methods">
          Paytm, Phonepe, GooglePay, Number
        </p>
        <p className="footer-payment-number">
          9893175257
        </p>

        {/* WhatsApp Icon */}
        <div className="footer-whatsapp-action" onClick={handleWhatsAppClick}>
          <Icon icon="logos:whatsapp-icon" width={42} height={42} className="whatsapp-footer-icon" />
        </div>
      </div>
    </div>
  );
};

export default BidsDetails;
