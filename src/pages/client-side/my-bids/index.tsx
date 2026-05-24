import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiddingFormSchema, biddingSchema } from "@/utils/validation";
import "@/styles/client-forms.css";
import "./bidding.css";

import {
  BidEntry,
  GameType,
  JODI_SUB_LIST,
  PANA_SUB_LIST,
  GAME_TYPE_LIST,
  AnkSubType,
  JodiSubType,
  PanaSubType,
} from "./types";
import BiddingForm from "./biding-form";
import BidsTable from "./biding-table";

const MyBids: React.FC = () => {
  const [bids, setBids] = useState<BidEntry[]>([]);

  const buildBidType = (data: BiddingFormSchema) => {
    switch (data.gameType) {
      case GameType.ANK:
        return `${GameType.ANK} - ${data.ankSub}`;

      case GameType.JODI:
        return `${GameType.JODI} - ${data.jodiSub}`;

      case GameType.PANA:
        return `${GameType.PANA} - ${data.panaSub}`;

      default:
        return "";
    }
  };

  return (
    <div className="bidding-page">
      <div className="bidding-card">
        <div className="client-form-header">
          <h1>Add Bidding</h1>
          <p>Place your bids for the game</p>
        </div>

        {/* Game Type */}

        {/* Form Component */}
        <BiddingForm />

        {/* Table Component */}
        <BidsTable bids={bids} />
      </div>
    </div>
  );
};

export default MyBids;
