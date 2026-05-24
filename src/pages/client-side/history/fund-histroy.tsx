import React from "react";
import HistoryDetails from "../history-details";

const FundHistory: React.FC = () => {
  const fundRecords = [
    { id: "1", date: "2026-05-20", amount: 5000, type: "Deposit" },
    { id: "2", date: "2026-05-22", amount: -2000, type: "Withdrawal" },
  ];

  return (
    <HistoryDetails
      title="Fund History"
      subtitle="Passbook View Fund Transaction History"
      records={fundRecords}
    />
  );
};

export default FundHistory;
