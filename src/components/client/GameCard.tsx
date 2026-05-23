import React from "react";
import { Card } from "antd";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

interface Game {
  name: string;
  status: string;
  numbers: string;
  color: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card
      style={{
        marginBottom: "12px",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
      styles={{ body: { padding: "16px" } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", width: "70px" }}>
          <ClockCircleOutlined style={{ fontSize: "28px", color: "#ffcc99" }} />
          <div style={{ fontSize: "10px", marginTop: "4px", color: "#666" }}>
            Game Time
          </div>
        </div>

        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontWeight: "700",
              fontSize: "16px",
              color: "#333",
              marginBottom: "2px",
            }}
          >
            {game.name}
          </div>
          <div
            style={{ fontSize: "11px", color: game.color, fontWeight: "500" }}
          >
            {game.status}
          </div>
          <div
            style={{
              fontWeight: "700",
              fontSize: "15px",
              color: "#ff8c00",
              marginTop: "2px",
            }}
          >
            {game.numbers}
          </div>
        </div>

        <div style={{ textAlign: "center", width: "70px" }}>
          <PlayCircleOutlined style={{ fontSize: "28px", color: "#ffcc99" }} />
          <div style={{ fontSize: "10px", marginTop: "4px", color: "#666" }}>
            Play Game
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
