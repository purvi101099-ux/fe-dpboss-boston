import React from "react";
import HistoryDetails from "../history-details";

const TransactionHistory: React.FC = () => {
  return (
    <HistoryDetails
      title="Transaction History"
      subtitle="Passbook View Transaction History"
      records={[]}
    />
  );
};

export default TransactionHistory;
