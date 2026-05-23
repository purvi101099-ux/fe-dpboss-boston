import React from "react";
import { useNavigate } from "react-router-dom";
import MenuListItem from "@/components/client/MenuListItem";
import { PATHS } from "@/routes/paths";
import "./TransactionHistory.css";

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const historyOptions = [
    {
      label: "Fund History",
      icon: "material-symbols:payments-outline-rounded",
      navigatePath: PATHS.FUND_HISTORY,
    },
    {
      label: "Main Bidding History",
      icon: "material-symbols:list-alt-outline-rounded",
      navigatePath: PATHS.BIDDING_HISTORY,
    },
    {
      label: "Starline Bidding History",
      icon: "material-symbols:format-list-bulleted-rounded",
      navigatePath: PATHS.STARLINE_HISTORY,
    },
    {
      label: "Transaction History",
      icon: "material-symbols:receipt-long-outline-rounded",
      navigatePath: PATHS.TXN_HISTORY,
    },
  ];

  return (
    <div className="txn-history-page">
      {historyOptions.map((option, index) => (
        <MenuListItem
          key={index}
          icon={option.icon}
          label={option.label}
          onClick={() => navigate(option.navigatePath)}
          divider={index !== historyOptions.length - 1}
          showChevron={true}
        />
      ))}
    </div>
  );
};

export default TransactionHistory;
