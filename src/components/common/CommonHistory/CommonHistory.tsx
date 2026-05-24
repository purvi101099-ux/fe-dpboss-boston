import React, { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Select, Input, Empty } from "antd";
import CommonTable from "@/components/common/CommonTable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./CommonHistory.css";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export interface CommonHistoryProps<T> {
  title: string;
  tableTitle?: string;
  data: T[];
  columns: any[];
  filterOptions: { value: string; label: string }[];
  defaultFilter: string;
  filterFn: (
    record: T,
    searchText: string,
    filterType: string,
    dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null,
  ) => boolean;
  groupByFn: (record: T) => string;
  renderMobileCard: (record: T) => React.ReactNode;
}

export function CommonHistory<T extends { id: string | number }>({
  title,
  tableTitle = "History Data",
  data,
  columns,
  filterOptions,
  defaultFilter,
  filterFn,
  groupByFn,
  renderMobileCard,
}: CommonHistoryProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string>(defaultFilter);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );

  const filteredData = useMemo(() => {
    return data.filter((record) =>
      filterFn(record, searchText, filterType, dateRange),
    );
  }, [data, searchText, filterType, dateRange, filterFn]);

  const groupedData = useMemo(() => {
    const groups: { [key: string]: T[] } = {};
    filteredData.forEach((record) => {
      const groupKey = groupByFn(record);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(record);
    });
    return groups;
  }, [filteredData, groupByFn]);

  return (
    <div className="txn-history-container">
      <div className="mobile-header">
        <h1 className="mobile-title">{title}</h1>
      </div>

      <div className="desktop-header">
        <h1 className="desktop-title">{title}</h1>
      </div>

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
          onChange={(value) => setFilterType(value)}
          options={filterOptions}
        />

        <RangePicker
          className="filter-date"
          onChange={(dates: any) => setDateRange(dates)}
        />
      </div>

      <div className="desktop-table-view">
        <CommonTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          searchable={false}
          tableTitle={tableTitle}
          pagination={{ defaultPageSize: 10, showSizeChanger: true }}
          scroll={{ y: "calc(100vh - 360px)", x: "max-content" }}
        />
      </div>

      <div className="mobile-card-view">
        {Object.keys(groupedData).length === 0 ? (
          <Empty description="No Records Found" />
        ) : (
          Object.entries(groupedData).map(([date, records]) => (
            <div className="txn-group" key={date}>
              <div className="txn-date-header">{date}</div>
              {records.map((record) => (
                <div className="txn-card" key={record.id}>
                  {renderMobileCard(record)}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
