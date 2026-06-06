import React, { useEffect } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import dayjs from "dayjs";
import { CommonHistory } from "@/components/common/CommonHistory/CommonHistory";
import { useWallet } from "@/hooks/useWallet";

export enum FundFilter {
  ALL = "All Funds",
  DEPOSIT = "Deposit",
  WITHDRAWAL = "Withdrawal",
}

const fundRecords = [
  {
    id: "#FUND1",
    date: "2026-05-20",
    displayDate: "May 20, 2026",
    amount: 5000,
    type: "Deposit",
    status: "Completed",
    description: "Deposit via UPI",
    isDeposit: true,
  },
  {
    id: "#FUND2",
    date: "2026-05-22",
    displayDate: "May 22, 2026",
    amount: -2000,
    type: "Withdrawal",
    status: "Completed",
    description: "Withdrawal to Bank",
    isDeposit: false,
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
    render: (_: any, record: any) => <span>{record.displayDate}</span>,
  },
  {
    title: "Fund ID",
    dataIndex: "id",
    key: "id",
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_: any, record: any) => (
      <span className={record.isDeposit ? "type-deposit" : "type-withdrawal"}>
        {record.isDeposit ? (
          <ArrowUpOutlined style={{ marginRight: 4 }} />
        ) : (
          <ArrowDownOutlined style={{ marginRight: 4 }} />
        )}
        {record.type}
      </span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a: any, b: any) => a.amount - b.amount,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color="green" style={{ borderRadius: "12px", padding: "0 10px" }}>
        {status}
      </Tag>
    ),
  },
];

const FundHistory: React.FC = () => {

    const { data: wallet, isLoading, refetch } = useWallet();
  
    useEffect(() => {
      refetch();
    }, []);
  return (
    <CommonHistory
      title="Fund History"
      data={fundRecords}
      columns={columns}
      filterOptions={[
        { value: FundFilter.ALL, label: "All Funds" },
        { value: FundFilter.DEPOSIT, label: "Deposits" },
        { value: FundFilter.WITHDRAWAL, label: "Withdrawals" },
      ]}
      defaultFilter={FundFilter.ALL}
      filterFn={(record, searchText, filterType, dateRange) => {
        const matchesSearch =
          record.id.toLowerCase().includes(searchText.toLowerCase()) ||
          record.description.toLowerCase().includes(searchText.toLowerCase());
        if (searchText && !matchesSearch) return false;
        if (filterType !== FundFilter.ALL && record.type !== filterType)
          return false;
        if (dateRange && dateRange[0] && dateRange[1]) {
          const recordDate = dayjs(record.date);
          const start = dateRange[0].startOf("day");
          const end = dateRange[1].endOf("day");
          if (recordDate.isBefore(start) || recordDate.isAfter(end))
            return false;
        }
        return true;
      }}
      groupByFn={(record) => record.displayDate}
      renderMobileCard={(record) => (
        <div className="txn-card-left">
          <div
            className={
              record.isDeposit ? "txn-icon deposit" : "txn-icon withdrawal"
            }
          >
            {record.isDeposit ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </div>
          <div className="txn-details">
            <div className="txn-desc-row">
              <span className="txn-desc">{record.description}</span>
              <span
                className={
                  record.isDeposit
                    ? "txn-amount-inline deposit"
                    : "txn-amount-inline withdrawal"
                }
              >
                {record.amount > 0 ? `+${record.amount}` : record.amount}
              </span>
            </div>
            <span className="txn-subtext">{record.date}</span>
          </div>
        </div>
      )}
    />
  );
};
export default FundHistory;
