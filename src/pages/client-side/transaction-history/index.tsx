import React from "react";
import { useNavigate } from "react-router-dom";
import MenuListItem from "@/components/client/MenuListItem";
import { PATHS } from "@/routes/paths";

const TransactionHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const historyOptions = [
    {
      label: "Fund History",
      icon: "fa:money",
      navigatePath: PATHS.FUND_HISTORY,
    },
    {
      label: "Main Bidding History",
      icon: "fa:list-alt",
      navigatePath: PATHS.BIDDING_HISTORY,
    },
    // {
    //   label: "Starline Bidding History",
    //   icon: "fa:list-alt",
    //   navigatePath: PATHS.STARLINE_HISTORY,
    // },
    {
      label: "Transaction History",
      icon: "fa:list",
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

export default TransactionHistoryPage;
