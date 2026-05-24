import React from "react";
import HistoryDetails from "../history-details";

const TransactionHistory: React.FC = () => {
  // Example: fetched transaction records
  const txnRecords = [
    { id: "1", date: "2026-05-19", amount: 3000, type: "Deposit" },
    { id: "2", date: "2026-05-22", amount: -1000, type: "Withdrawal" },
  ];

  return (
    <HistoryDetails
      title="Transaction History"
      subtitle="Passbook View Transaction History"
      records={txnRecords}
    />
  );
};

export default TransactionHistory;
