import React, { useState, useMemo } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { DatePicker, Select, Input, Empty, Tag } from "antd";
import CommonTable from "@/components/common/CommonTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export enum TransactionFilter {
  ALL = "All Transactions",
  DEPOSIT = "Deposit",
  WITHDRAWAL = "Withdrawal",
}

// Generate ~20 records of dummy data for proper testing of pagination, sorting, and filtering
const staticData = Array.from({ length: 22 }).map((_, index) => {
  const isDeposit = index % 3 === 0;
  // Group some transactions on the same day by dividing index by 2
  const day = 25 - Math.floor(index / 2);
  const dateStr = `2023-10-${day.toString().padStart(2, "0")}`;

  return {
    id: `#TXN0${891 - index}`,
    date: dateStr,
    displayDate: `Oct ${day.toString().padStart(2, "0")}, 2023`,
    type: isDeposit ? "Deposit" : "Withdrawal",
    description: isDeposit
      ? index % 4 === 0
        ? "Point Purchase (Debit Card)"
        : "Monthly Bonus"
      : "Points Redeemed (Shop)",
    amountVal: isDeposit ? (index + 1) * 500 : -((index + 1) * 200),
    amountStr: isDeposit
      ? `+${(index + 1) * 500} pts`
      : `-${(index + 1) * 200} pts`,
    status: index === 0 ? "Pending" : "Completed",
    isDeposit,
    subtext:
      isDeposit && index % 4 === 0 ? `Visa **** ${1000 + index}` : undefined,
  };
});

const TransactionHistory: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<TransactionFilter>(
    TransactionFilter.ALL,
  );
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );

  // Filter Data
  const filteredData = useMemo(() => {
    return staticData.filter((record) => {
      // 1. Text Search Filter
      const matchesSearch =
        record.id.toLowerCase().includes(searchText.toLowerCase()) ||
        record.description.toLowerCase().includes(searchText.toLowerCase()) ||
        record.type.toLowerCase().includes(searchText.toLowerCase());

      if (searchText && !matchesSearch) return false;

      // 2. Type Filter
      if (filterType !== TransactionFilter.ALL) {
        if (record.type !== filterType) return false;
      }

      // 3. Date Range Filter
      if (dateRange && dateRange[0] && dateRange[1]) {
        const recordDate = dayjs(record.date);
        const start = dateRange[0].startOf("day");
        const end = dateRange[1].endOf("day");
        if (recordDate.isBefore(start) || recordDate.isAfter(end)) return false;
      }

      return true;
    });
  }, [searchText, filterType, dateRange]);

  // Antd Table Columns Configure
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
      title: "Transaction ID",
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
      title: "Amount (pts)",
      dataIndex: "amountVal",
      key: "amountVal",
      sorter: (a: any, b: any) => a.amountVal - b.amountVal,
      render: (_: any, record: any) => (
        <span
          className={record.isDeposit ? "amount-deposit" : "amount-withdrawal"}
        >
          {record.amountStr}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "Completed" ? "green" : "orange"}
          style={{ borderRadius: "12px", padding: "0 10px" }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  // Group filteredData by displayDate for mobile view
  const groupedData = useMemo(() => {
    const groups: { [key: string]: typeof filteredData } = {};
    filteredData.forEach((record) => {
      if (!groups[record.displayDate]) {
        groups[record.displayDate] = [];
      }
      groups[record.displayDate].push(record);
    });
    return groups;
  }, [filteredData]);

  return (
    <div className="txn-history-container">
      {/* Upper Top (Mobile only initially but filters applied globally) */}
      <div className="mobile-header">
        <h1 className="mobile-title">Transaction History</h1>
      </div>

      <div className="desktop-header">
        <h1 className="desktop-title">Transaction History </h1>
      </div>

      {/* Shared Global Filters */}
      <div className="global-filters">
        <div className="search-wrapper">
          <Input
            className="filter-search"
            placeholder="Search descriptions or IDs..."
            allowClear
            suffix={<SearchOutlined style={{ color: "#8e8e93" }} />}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Select
          className="filter-select"
          value={filterType}
          onChange={(value) => setFilterType(value as TransactionFilter)}
          options={[
            { value: TransactionFilter.ALL, label: "All Transactions" },
            { value: TransactionFilter.DEPOSIT, label: "Deposits" },
            { value: TransactionFilter.WITHDRAWAL, label: "Withdrawals" },
          ]}
        />

        <RangePicker
          className="filter-date"
          onChange={(dates: any) => setDateRange(dates)}
        />
      </div>

      {/* Desktop Table View Custom Component Injection */}
      <div className="desktop-table-view">
        <CommonTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          searchable={
            false
          } /* Turned off inside CommonTable so we use our Global Filters */
          tableTitle="History Data"
          pagination={{ defaultPageSize: 10, showSizeChanger: true }}
          scroll={{ y: "calc(100vh - 450px)", x: "max-content" }}
        />
      </div>

      {/* Mobile Card View with the identical filtered array */}
      <div className="mobile-card-view">
        {Object.keys(groupedData).length === 0 ? (
          <Empty description="No Records Found" />
        ) : (
          Object.entries(groupedData).map(([date, records]) => (
            <div className="txn-group" key={date}>
              <div className="txn-date-header">{date}</div>
              {records.map((record) => (
                <div className="txn-card" key={record.id}>
                  <div className="txn-card-left">
                    <div
                      className={
                        record.isDeposit
                          ? "txn-icon deposit"
                          : "txn-icon withdrawal"
                      }
                    >
                      {record.isDeposit ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )}
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
                          {record.amountStr}
                        </span>
                      </div>
                      {record.subtext && (
                        <span className="txn-subtext">{record.subtext}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
