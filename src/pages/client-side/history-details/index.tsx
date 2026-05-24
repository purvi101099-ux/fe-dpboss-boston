// src/components/HistoryDetails.tsx
import React from "react";
import "./history-details.css";

interface HistoryDetailsProps {
  title: string;
  subtitle: string;
  records?: Array<{ id: string; date: string; amount: number; type: string }>;
}

const HistoryDetails: React.FC<HistoryDetailsProps> = ({
  title,
  subtitle,
  records,
}) => {
  return (
    <div className="history-details-page">
      <div className="history-details-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="history-details-content">
        {records && records.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.date}</td>
                  <td>{rec.type}</td>
                  <td>{rec.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-record-found">No Record Found.</div>
        )}
      </div>
    </div>
  );
};

export default HistoryDetails;
