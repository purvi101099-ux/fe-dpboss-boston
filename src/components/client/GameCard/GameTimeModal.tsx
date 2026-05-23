import React from "react";
import { Modal, Button } from "antd";
import { Icon } from "@iconify/react";
import "./GameTimeModal.scss";

interface GameTimeModalProps {
  game: {
    name: string;
    times?: {
      openBidEnds: string;
      closeBidEnds: string;
      openResult: string;
      closeResult: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

const GameTimeModal: React.FC<GameTimeModalProps> = ({
  game,
  isOpen,
  onClose,
}) => {
  const gameTimes = [
    { label: "Open Bid Ends", time: game.times?.openBidEnds || "00:00 AM" },
    { label: "Close Bid Ends", time: game.times?.closeBidEnds || "00:00 AM" },
    { label: "Open Result", time: game.times?.openResult || "00:00 AM" },
    { label: "Close Result", time: game.times?.closeResult || "00:00 AM" },
  ];

  return (
    <Modal
      title={
        <div className="game-modal-header">
          <span>{game.name}</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      rootClassName="game-time-modal"
      closeIcon={
        <Icon icon="material-symbols:close" className="modal-close-icon" />
      }
      centered
      width={400}
    >
      <div className="game-time-list">
        {gameTimes.map((item, index) => (
          <div key={index} className="game-time-item">
            <div className="time-item-left">
              <Icon
                icon="material-symbols:schedule-outline-rounded"
                className="time-icon-red"
              />
              <span className="time-label">{item.label}</span>
            </div>
            <div className="time-value">{item.time}</div>
          </div>
        ))}
      </div>
      <div className="modal-footer-btn-wrap">
        <Button className="modal-close-btn" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default GameTimeModal;
