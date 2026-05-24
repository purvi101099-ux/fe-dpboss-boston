// src/pages/BiddingHistory.tsx
import React from "react";
import HistoryDetails from "../history-details";

const BiddingHistory: React.FC = () => {
  // Example: fetched bidding records
  const biddingRecords = [
    { id: "1", date: "2026-05-21", amount: 1500, type: "Bid Placed" },
    { id: "2", date: "2026-05-22", amount: 2000, type: "Bid Won" },
  ];

  return (
    <HistoryDetails
      title="Bidding History"
      subtitle="Main markets bidding records"
      records={biddingRecords}
    />
  );
};

export default BiddingHistory;
