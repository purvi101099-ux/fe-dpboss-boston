import React from "react";
import "@/styles/client-forms.css";
import "./game-rates.css";

const GameRates: React.FC = () => {
  const mainGames = [
    { name: "Single ank", rate: "10 ka 90" },
    { name: "jodi", rate: "10 ka 950" },
    { name: "Single Panna", rate: "10 ka 1400" },
    { name: "Double Panna", rate: "10 ka 2800" },
    { name: "Triple Panna", rate: "10 ka 6,000" },
    { name: "half Sangam", rate: "10 ka 10,000" },
    { name: "Full Sangam", rate: "10 ka 1,00,000" },
  ];

  const starlineGames = [
    { name: "Single ank", rate: "10 ka 100" },
    { name: "Single Panna", rate: "10 ka 1600" },
    { name: "Double Panna", rate: "10 ka 3,000" },
    { name: "Triple Panna", rate: "10 ka 10,000" },
  ];

  return (
    <div className="game-rates-page">
      <div className="client-form-header">
        <h1>Game Rate List</h1>
        <p>We Offer Best Rate in market - Full rate</p>
      </div>

      <div className="rates-content">
        <div className="rates-box">
          <h2 className="box-title">Main Games Win Ratio</h2>
          <div className="rates-list">
            {mainGames.map((item, idx) => (
              <div key={idx} className="rate-row">
                <span className="gr-game-name">{item.name}</span>
                <span className="gr-game-rate">{item.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rates-box">
          <h2 className="box-title">Starline Games Win Ratio</h2>
          <div className="rates-list">
            {starlineGames.map((item, idx) => (
              <div key={idx} className="rate-row">
                <span className="gr-game-name">{item.name}</span>
                <span className="gr-game-rate">{item.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRates;
