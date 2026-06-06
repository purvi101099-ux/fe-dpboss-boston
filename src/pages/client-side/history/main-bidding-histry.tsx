import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import dayjs from "dayjs";
import { CommonHistory } from "@/components/common/CommonHistory/CommonHistory";

export enum BiddingFilter {
  ALL = "All Bids",
  PLACED = "Bid Placed",
  WON = "Bid Won",
}

const biddingRecords = [
  {
    id: "#BID1",
    date: "2026-05-21",
    displayDate: "May 21, 2026",
    amount: 1500,
    type: "Bid Placed",
    description: "Kalyan Morning",
    isWin: false,
    status: "Completed",
  },
  {
    id: "#BID2",
    date: "2026-05-22",
    displayDate: "May 22, 2026",
    amount: 2000,
    type: "Bid Won",
    description: "Milan Day",
    isWin: true,
    status: "Completed",
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
    render: (status: string) => <Tag color="blue">{status}</Tag>,
  },
];

const MainBiddingHistory: React.FC = () => {
  return (
    <CommonHistory
      title="Main Bidding History"
      data={biddingRecords}
      columns={columns}
      filterOptions={[
        { value: BiddingFilter.ALL, label: "All Bids" },
        { value: BiddingFilter.PLACED, label: "Bid Placed" },
        { value: BiddingFilter.WON, label: "Bid Won" },
      ]}
      defaultFilter={BiddingFilter.ALL}
      filterFn={(record, searchText, filterType, dateRange) => {
        const matchesSearch =
          record.id.toLowerCase().includes(searchText.toLowerCase()) ||
          record.description.toLowerCase().includes(searchText.toLowerCase());
        if (searchText && !matchesSearch) return false;
        if (filterType !== BiddingFilter.ALL && record.type !== filterType)
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
export default MainBiddingHistory;
