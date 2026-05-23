import React from "react";
import { useLocation } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import "./history-details.css";

const HistoryDetails: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = "History";
  let subtitle = "View your historical records";

  if (path === PATHS.FUND_HISTORY) {
    title = "Fund History";
    subtitle = "Passbook View Fund Transaction History";
  } else if (path === PATHS.BIDDING_HISTORY) {
    title = "Bidding History";
    subtitle = "Main markets bidding records";
  } else if (path === PATHS.STARLINE_HISTORY) {
    title = "Starline Bidding History";
    subtitle = "Starline markets bidding records";
  } else if (path === PATHS.TXN_HISTORY) {
    title = "Transaction History";
    subtitle = "Passbook View Transaction History";
  }

  return (
    <div className="history-details-page">
      <div className="history-details-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="history-details-content">
        <div className="no-record-found">No Record Found.</div>
      </div>
    </div>
  );
};

export default HistoryDetails;
