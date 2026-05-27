import React from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react";
import useModal from "@/hooks/useModal";
import GameTimeModal from "@/components/client/GameTimeModal/GameTimeModal";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import "./GameCard.css";

interface Game {
  name: string;
  status: string;
  numbers: string;
  color: string;
  times?: {
    openBidEnds: string;
    closeBidEnds: string;
    openResult: string;
    closeResult: string;
  };
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const onPlayGame = () => {
    navigate(PATHS.PLAY_GAME);
  };
  return (
    <>
      <Card className="game-card">
        <div className="game-card-layout">
          <div className="game-name">{game.name}</div>
          <div
            className="game-side-col game-time-col"
            onClick={openModal}
            style={{ cursor: "pointer" }}
          >
            <Icon icon="fa:clock-o" className="game-card-icon" />
            <div className="game-card-label">Game Time</div>
          </div>
          <div className="game-status" style={{ color: game.color }}>
            {game.status}
          </div>

          <div className="game-numbers">{game.numbers}</div>

          <div
            className="game-side-col game-play-col"
            style={{ cursor: "pointer" }}
            onClick={() => onPlayGame()}
          >
            <Icon icon="fa:play-circle" className="game-card-icon" />
            <div className="game-card-label">Play Game</div>
          </div>
        </div>
      </Card>

      <GameTimeModal game={game} isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default GameCard;
