// src/pages/StarlineHistory.tsx
import React from "react";
import HistoryDetails from "../history-details";

const StarlineHistory: React.FC = () => {
  // Example: fetched starline bidding records
  const starlineRecords = [
    { id: "1", date: "2026-05-20", amount: 500, type: "Starline Bid" },
    { id: "2", date: "2026-05-23", amount: 1200, type: "Starline Win" },
  ];

  return (
    <HistoryDetails
      title="Starline Bidding History"
      subtitle="Starline markets bidding records"
      records={starlineRecords}
    />
  );
};

export default StarlineHistory;
