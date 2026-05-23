import React from "react";
import MenuListItem from "@/components/client/MenuListItem";
import "./TransactionHistory.css";

const TransactionHistory: React.FC = () => {
  const historyOptions = [
    {
      label: "Fund History",
      icon: "material-symbols:payments-outline-rounded",
      onClick: () => console.log("Fund History"),
    },
    {
      label: "Main Bidding History",
      icon: "material-symbols:list-alt-outline-rounded",
      onClick: () => console.log("Main Bidding History"),
    },
    {
      label: "Starline Bidding History",
      icon: "material-symbols:format-list-bulleted-rounded",
      onClick: () => console.log("Starline Bidding History"),
    },
    {
      label: "Transaction History",
      icon: "material-symbols:receipt-long-outline-rounded",
      onClick: () => console.log("Transaction History"),
    },
  ];

  return (
    <div className="txn-history-page">
      {historyOptions.map((option, index) => (
        <MenuListItem
          key={index}
          icon={option.icon}
          label={option.label}
          onClick={option.onClick}
          divider={index !== historyOptions.length - 1}
          showChevron={true}
        />
      ))}
    </div>
  );
};

export default TransactionHistory;
