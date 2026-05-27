import React, { useState } from "react";
import { BidEntry } from "./types";
import BiddingForm from "./biding-form";
import BidsTable from "./biding-table";
import BidsDetails from "./bids-details";
import "@/styles/client-forms.css";
import "./bidding.css";

const MyBids: React.FC = () => {
  const [bids, setBids] = useState<BidEntry[]>([]);

  const handleAddBid = (bid: { bidType: string; digits: string; points: number }) => {
    const newBid: BidEntry = {
      id: Date.now(),
      bidType: bid.bidType,
      digits: bid.digits,
      points: bid.points,
    };
    setBids((prevBids) => [...prevBids, newBid]);
  };

  const handleDeleteBid = (id: number) => {
    setBids((prevBids) => prevBids.filter((item) => item.id !== id));
  };

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
