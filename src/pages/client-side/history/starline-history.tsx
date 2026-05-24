import React from "react";
import { Tag } from "antd";
import dayjs from "dayjs";
import { CommonHistory } from "@/components/common/CommonHistory/CommonHistory";

export enum StarlineFilter {
  ALL = "All Bids",
  PLACED = "Bid Placed",
  WON = "Bid Won",
}

const starlineRecords = [
  {
    id: "#STAR1",
    date: "2026-05-23",
    displayDate: "May 23, 2026",
    amount: 1500,
    type: "Bid Placed",
    description: "Starline Morning",
    isWin: false,
    status: "Pending",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (_: any, record: any) => <span>{record.displayDate}</span>,
  },
  { title: "Bid ID", dataIndex: "id", key: "id" },
  { title: "Market", dataIndex: "description", key: "description" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => <Tag color="orange">{status}</Tag>,
  },
];

const StarlineHistory: React.FC = () => {
  return (
    <CommonHistory
      title="Starline Bidding History"
      data={starlineRecords}
      columns={columns}
      filterOptions={[
        { value: StarlineFilter.ALL, label: "All Bids" },
        { value: StarlineFilter.PLACED, label: "Bid Placed" },
        { value: StarlineFilter.WON, label: "Bid Won" },
      ]}
      defaultFilter={StarlineFilter.ALL}
      filterFn={(record, searchText, filterType, dateRange) => {
        const matchesSearch =
          record.id.toLowerCase().includes(searchText.toLowerCase()) ||
          record.description.toLowerCase().includes(searchText.toLowerCase());
        if (searchText && !matchesSearch) return false;
        if (filterType !== StarlineFilter.ALL && record.type !== filterType)
          return false;
        if (dateRange && dateRange[0] && dateRange[1]) {
          const start = dateRange[0].startOf("day");
          const end = dateRange[1].endOf("day");
          if (
            dayjs(record.date).isBefore(start) ||
            dayjs(record.date).isAfter(end)
          )
            return false;
        }
        return true;
      }}
      groupByFn={(record) => record.displayDate}
      renderMobileCard={(record) => (
        <div className="txn-card-left">
          <div className="txn-details">
            <div className="txn-desc-row">
              <span className="txn-desc">
                {record.description} - {record.type}
              </span>
              <span className="txn-amount-inline">{record.amount}</span>
            </div>
            <span className="txn-subtext">{record.date}</span>
          </div>
        </div>
      )}
    />
  );
};
export default StarlineHistory;
