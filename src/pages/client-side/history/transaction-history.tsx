import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { DatePicker, Select, Input, Empty, Tag, Spin } from "antd";
import CommonTable from "@/components/common/CommonTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { fetchWalletHistory, TransactionRecord } from "@/api/wallet";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export enum TransactionFilter {
  ALL = "All Transactions",
  DEPOSIT = "Deposit",
  WITHDRAWAL = "Withdrawal",
  BONUS = "Bonus",
}

export enum StatusFilter {
  ALL = "All Status",
  COMPLETED = "Completed",
  PENDING = "Pending",
  FAILED = "Failed",
}

// Transform API response to table data format
const transformTransactionData = (apiData: TransactionRecord[]) => {
  return apiData.map((record, index) => {
    const isDeposit = (record.wallet_type === "Deposit" || record.type_id === 1 || record.type_id === 5) && record.points > 0;
    
    return {
      id: `#TXN${record.txt_id.toString().padStart(5, "0")}`,
      date: record.created_at,
      displayDate: dayjs(record.created_at).format("MMM DD, YYYY"),
      type: record.wallet_type,
      description: record.description,
      amountVal: isDeposit ? record.points : -record.points,
      amountStr: isDeposit
        ? `+${record.points} pts`
        : `-${record.points} pts`,
      status: record.status_name,
      isDeposit,
      subtext: record.market_name ? `Market: ${record.market_name}` : undefined,
    };
  });
};

const TransactionHistory: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<TransactionFilter>(
    TransactionFilter.ALL,
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.ALL,
  );
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<ReturnType<typeof transformTransactionData>>([]);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : {};
  const userId = userData?.user_id;
  // Fetch transaction data from API
  useEffect(() => {
    const loadTransactionHistory = async () => {
      try {
        setLoading(true);
        setError(null);  
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const apiResponse = await fetchWalletHistory(parseInt(userId), "transaction");
        const transformedData = transformTransactionData(apiResponse);
        setTransactionData(transformedData);
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError(err instanceof Error ? err.message : "Failed to load transaction history");
      } finally {
        setLoading(false);
      }
    };

    loadTransactionHistory();
  }, []);

  // Filter Data
  const filteredData = useMemo(() => {
    return transactionData.filter((record) => {
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

      // 3. Status Filter
      if (statusFilter !== StatusFilter.ALL) {
        if (record.status !== statusFilter) return false;
      }

      // 4. Date Range Filter
      if (dateRange && dateRange[0] && dateRange[1]) {
        const recordDate = dayjs(record.date);
        const start = dateRange[0].startOf("day");
        const end = dateRange[1].endOf("day");
        if (recordDate.isBefore(start) || recordDate.isAfter(end)) return false;
      }

      return true;
    });
  }, [searchText, filterType, statusFilter, dateRange, transactionData]);

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
        {/* <div className="search-wrapper">
          <Input
            className="filter-search"
            placeholder="Search descriptions or IDs..."
            allowClear
            suffix={<SearchOutlined style={{ color: "#8e8e93" }} />}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div> */}

        <Select
          className="filter-select"
          value={filterType}
          onChange={(value) => setFilterType(value as TransactionFilter)}
          options={[
            { value: TransactionFilter.ALL, label: "All Transactions" },
            { value: TransactionFilter.DEPOSIT, label: "Deposits" },
            { value: TransactionFilter.WITHDRAWAL, label: "Withdrawals" },
            { value: TransactionFilter.BONUS, label: "Bonus" },
          ]}
        />

        <Select
          className="filter-select"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value as StatusFilter)}
          options={[
            { value: StatusFilter.ALL, label: "All Status" },
            { value: StatusFilter.COMPLETED, label: "Completed" },
            { value: StatusFilter.PENDING, label: "Pending" },
            { value: StatusFilter.FAILED, label: "Failed" },
          ]}
        />

        {/* <RangePicker
          className="filter-date"
          onChange={(dates: any) => setDateRange(dates)}
        /> */}
      </div>

      {/* Desktop Table View Custom Component Injection */}
      <div className="desktop-table-view">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        ) : error ? (
          <Empty description={error} />
        ) : (
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
        )}
      </div>

      {/* Mobile Card View with the identical filtered array */}
      <div className="mobile-card-view">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        ) : error ? (
          <Empty description={error} />
        ) : Object.keys(groupedData).length === 0 ? (
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
                        record.isDeposit && record.status !== "Pending" && record.status !== "Failed"
                          ? "txn-icon deposit"
                          : "txn-icon withdrawal"
                      }
                    >
                      {record.isDeposit && record.status !== "Pending" && record.status !== "Failed" ? (
                        <ArrowUpOutlined />
                      ) : (
                        (record.status === "Pending" || record.status === "Failed") ? (
                        <QuestionOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )
                      )}
                    </div>
                    <div className="txn-details">
                      <div className="txn-desc-row">
                        <span className="txn-desc">{record.description}</span>
                        <span
                          className={`txn-amount-inline ${
                                      record.isDeposit ? "deposit" : "withdrawal"
                                    } ${["Pending", "Failed"].includes(record.status) ? "txn-amount-dotted" : ""}`}
                        >
                          {record.amountStr}
                        </span>
                      </div>
                      {record.status && (
                        <span className="txn-subtext">{record.status}</span>
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
