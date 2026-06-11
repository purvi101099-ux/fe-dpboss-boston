import React, { useState } from "react";
import dayjs from "dayjs";
import { BidEntry } from "./types";
import BiddingForm from "./biding-form";
import BidsTable from "./biding-table";
import BidsDetails from "./bids-details";
import "@/styles/client-forms.css";
import "./bidding.css";
import { useParams } from "react-router-dom";

const MyBids: React.FC = () => {
  const [bids, setBids] = useState<BidEntry[]>([]);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : {};
  const userId = userData?.user_id;
  const { marketId } = useParams();

  const handleAddBid = (bid: any) => {
      
    const newBid: BidEntry = {
      bid_user_id: userId,
      bid_market_id: Number(marketId || 1), // Default to 1 if marketId is not available
      id: Date.now(),
      bid_type_id: bid.gameType,
      bid_game_name: bid.gameType,
      bid_digit: bid.digits,
      bid_point: bid.points,
      bid_session: bid.bidType,
      bid_date: dayjs().format("YYYY-MM-DD")
    };
    setBids((prevBids) => [...prevBids, newBid]);
  };

  const handleDeleteBid = (id: number) => {
    setBids((prevBids) => prevBids.filter((item) => item.id !== id));
  };
  console.log("Current Bids:", bids);

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>Add Bidding</h1>
          <p>Place your bids for the game</p>
        </div>

        {/* Form Component */}
        <BiddingForm onAddBid={handleAddBid} />

        {/* Table Component */}
        <BidsTable bids={bids} onDelete={handleDeleteBid} />
      </div>

      {/* Bids Details Section */}
      <BidsDetails />
    </div>
  );
};

export default MyBids;
