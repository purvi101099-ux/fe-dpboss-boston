import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./TransactionHistory.css";

interface Transaction {
  id: number;
  date: string;
  time: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  balance: number;
  status: "success" | "pending" | "failed";
  gameName?: string;
}

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    date: "23 May 2026",
    time: "10:32 AM",
    description: "Wallet Top-up",
    type: "credit",
    amount: 500,
    balance: 1500,
    status: "success",
  },
  {
    id: 2,
    date: "23 May 2026",
    time: "11:15 AM",
    description: "Bid Placed",
    type: "debit",
    amount: 200,
    balance: 1300,
    status: "success",
    gameName: "KALYAN",
  },
  {
    id: 3,
    date: "22 May 2026",
    time: "03:45 PM",
    description: "Winning Amount",
    type: "credit",
    amount: 1800,
    balance: 3100,
    status: "success",
    gameName: "MILAN DAY",
  },
  {
    id: 4,
    date: "22 May 2026",
    time: "05:20 PM",
    description: "Bid Placed",
    type: "debit",
    amount: 100,
    balance: 3000,
    status: "success",
    gameName: "TIME BAZAR",
  },
  {
    id: 5,
    date: "21 May 2026",
    time: "09:10 AM",
    description: "Wallet Top-up",
    type: "credit",
    amount: 1000,
    balance: 4000,
    status: "success",
  },
  {
    id: 6,
    date: "21 May 2026",
    time: "02:30 PM",
    description: "Bid Placed",
    type: "debit",
    amount: 500,
    balance: 3500,
    status: "pending",
    gameName: "MILAN NIGHT",
  },
  {
    id: 7,
    date: "20 May 2026",
    time: "07:55 PM",
    description: "Withdrawal",
    type: "debit",
    amount: 2000,
    balance: 1500,
    status: "success",
  },
  {
    id: 8,
    date: "20 May 2026",
    time: "12:00 PM",
    description: "Bid Placed",
    type: "debit",
    amount: 300,
    balance: 3500,
    status: "failed",
    gameName: "RAJDHANI DAY",
  },
  {
    id: 9,
    date: "19 May 2026",
    time: "08:45 AM",
    description: "Winning Amount",
    type: "credit",
    amount: 3500,
    balance: 5500,
    status: "success",
    gameName: "KALYAN",
  },
  {
    id: 10,
    date: "19 May 2026",
    time: "06:30 PM",
    description: "Wallet Top-up",
    type: "credit",
    amount: 2000,
    balance: 7500,
    status: "success",
  },
];

type FilterType = "all" | "credit" | "debit";

const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [showDummyData] = useState(true); // Toggle to false to see empty state

  const transactions = showDummyData ? dummyTransactions : [];

  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const totalCredit = transactions
    .filter((t) => t.type === "credit" && t.status === "success")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDebit = transactions
    .filter((t) => t.type === "debit" && t.status === "success")
    .reduce((acc, t) => acc + t.amount, 0);

  const getStatusIcon = (status: Transaction["status"]) => {
    if (status === "success") return "mdi:check-circle";
    if (status === "pending") return "mdi:clock-outline";
    return "mdi:close-circle";
  };

  return (
    <div className="txn-page">
      {/* Page Header */}
      <div className="txn-page-header">
        <h1 className="txn-title">Transaction History</h1>
        <p className="txn-subtitle">Passbook View Transaction History</p>
      </div>

      {transactions.length === 0 ? (
        /* ── Empty State ── */
        <div className="txn-empty-state">
          <div className="txn-empty-illustration">
            <Icon icon="mdi:receipt-text-outline" className="txn-empty-icon" />
            <div className="txn-empty-circles">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <h2 className="txn-empty-title">No Record Found.</h2>
          <p className="txn-empty-desc">
            You haven't made any transactions yet. Start playing to see your
            history here.
          </p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="txn-summary-row">
            <div className="txn-summary-card txn-summary-credit">
              <Icon icon="mdi:arrow-down-circle" className="txn-summary-icon" />
              <div>
                <p className="txn-summary-label">Total Credit</p>
                <p className="txn-summary-amount">
                  ₹{totalCredit.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="txn-summary-card txn-summary-debit">
              <Icon icon="mdi:arrow-up-circle" className="txn-summary-icon" />
              <div>
                <p className="txn-summary-label">Total Debit</p>
                <p className="txn-summary-amount">
                  ₹{totalDebit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="txn-filter-tabs">
            {(["all", "credit", "debit"] as FilterType[]).map((tab) => (
              <button
                key={tab}
                className={`txn-filter-btn ${filter === tab ? "active" : ""}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          <div className="txn-list">
            {filtered.length === 0 ? (
              <div className="txn-no-filter-result">
                <Icon icon="mdi:filter-off-outline" />
                <p>No transactions found for this filter.</p>
              </div>
            ) : (
              filtered.map((txn) => (
                <div key={txn.id} className={`txn-item txn-item--${txn.type}`}>
                  {/* Left: Icon + Info */}
                  <div className="txn-item-left">
                    <div className={`txn-icon-wrap txn-icon--${txn.type}`}>
                      <Icon
                        icon={
                          txn.type === "credit"
                            ? "mdi:arrow-down-bold"
                            : "mdi:arrow-up-bold"
                        }
                        className="txn-direction-icon"
                      />
                    </div>
                    <div className="txn-info">
                      <p className="txn-desc">{txn.description}</p>
                      {txn.gameName && (
                        <p className="txn-game-name">{txn.gameName}</p>
                      )}
                      <p className="txn-datetime">
                        {txn.date} · {txn.time}
                      </p>
                    </div>
                  </div>

                  {/* Right: Amount + Status */}
                  <div className="txn-item-right">
                    <p
                      className={`txn-amount ${
                        txn.type === "credit"
                          ? "txn-amount--credit"
                          : "txn-amount--debit"
                      }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}₹
                      {txn.amount.toLocaleString()}
                    </p>
                    <p className="txn-balance">
                      Bal: ₹{txn.balance.toLocaleString()}
                    </p>
                    <span className={`txn-status txn-status--${txn.status}`}>
                      <Icon icon={getStatusIcon(txn.status)} />
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
