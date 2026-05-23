import React from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react";
import "./GameCard.css";

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
    <Card className="game-card">
      <div className="game-card-layout">
        {/* Top: Name (Mobile) / Center: Name (Desktop) */}
        <div className="game-name">{game.name}</div>

        {/* Left column: Game Time */}
        <div className="game-side-col game-time-col">
          <Icon
            icon="material-symbols:schedule-outline-rounded"
            className="game-card-icon"
          />
          <div className="game-card-label">Game Time</div>
        </div>

        {/* Middle items: Status and Numbers */}
        <div className="game-status" style={{ color: game.color }}>
          {game.status}
        </div>

        <div className="game-numbers">{game.numbers}</div>

        {/* Right column: Play Game */}
        <div className="game-side-col game-play-col">
          <Icon
            icon="material-symbols:play-circle-outline-rounded"
            className="game-card-icon"
          />
          <div className="game-card-label">Play Game</div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
