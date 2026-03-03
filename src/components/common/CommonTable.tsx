import React, { useState, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Card,
  Typography,
  theme,
  Empty,
} from "antd";
import type { TableProps, TableColumnType } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface CommonTableProps<T> extends Omit<TableProps<T>, "columns"> {
  columns: TableColumnType<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  tableTitle?: string;
  extra?: React.ReactNode;
  onRefresh?: () => void;
  globalSearchKey?: keyof T | (keyof T)[];
}

const CommonTable = <T extends object>({
  columns,
  dataSource = [],
  searchable = true,
  searchPlaceholder = "Search records...",
  tableTitle,
  extra,
  onRefresh,
  globalSearchKey,
  pagination,
  ...rest
}: CommonTableProps<T>) => {
  const { token } = theme.useToken();
  const [searchText, setSearchText] = useState("");

  // Handle global search
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource;

    return dataSource.filter((item) => {
      const searchInKeys = globalSearchKey
        ? Array.isArray(globalSearchKey)
          ? globalSearchKey
          : [globalSearchKey]
        : (Object.keys(item) as (keyof T)[]);

      return searchInKeys.some((key) => {
        const value = item[key];
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [dataSource, searchText, globalSearchKey]);

  return (
    <Card
      styles={{
        body: { padding: "12px" },
      }}
      style={{
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        className="table-header-container"
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          className="header-left-side"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            flex: 1,
            minWidth: 0,
          }}
        >
          {tableTitle && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "4px",
                  height: "18px",
                  background: "var(--pink-logo)",
                  borderRadius: "2px",
                }}
              />
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: token.colorTextHeading,
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {tableTitle}
              </Text>
            </div>
          )}
          {searchable && (
            <Input
              placeholder={searchPlaceholder}
              prefix={
                <SearchOutlined style={{ color: token.colorTextTertiary }} />
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="table-search-input"
              style={{
                borderRadius: "6px",
                width: "100%",
                maxWidth: 280,
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            />
          )}
        </div>

        <Space wrap className="header-right-side">
          {extra}
          {onRefresh && (
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              style={{
                borderRadius: "6px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              Refresh
            </Button>
          )}
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showTotal: (total, range) => (
            <span style={{ color: token.colorTextSecondary, fontSize: "13px" }}>
              Showing {range[0]}-{range[1]} of {total} items
            </span>
          ),
          position: ["bottomRight"],
          ...pagination,
        }}
        scroll={{ x: "max-content" }}
        size="small"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-even" : "table-row-odd"
        }
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No records found"
            />
          ),
        }}
        style={{
          background: token.colorBgContainer,
        }}
        {...rest}
      />

      <style>{`
        .table-row-even {
          background-color: ${token.colorBgContainer};
        }
        .table-row-odd {
          background-color: ${token.colorFillAlter};
        }
        .ant-table-thead > tr > th {
          background-color: ${token.colorFillTertiary} !important;
          font-weight: 600 !important;
          color: ${token.colorTextHeading} !important;
          font-size: 13px !important;
          padding: 10px 16px !important;
          border-bottom: 1px solid ${token.colorBorderSecondary} !important;
        }
        .ant-table-tbody > tr > td {
          font-size: 13px !important;
          padding: 8px 16px !important;
          border-bottom: 1px solid ${token.colorBorderSecondary} !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: ${token.colorFillSecondary} !important;
        }
        .ant-pagination-item-active {
          border-color: var(--pink-logo) !important;
        }
        .ant-pagination-item-active a {
          color: var(--pink-logo) !important;
        }
        .ant-table-pagination.ant-pagination {
          margin: 16px 0 !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        .ant-pagination-total-text {
          margin-right: auto !important;
          order: -1;
        }
        .ant-table {
          background: transparent !important;
        }
        @media (max-width: 576px) {
          .table-header-container {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .header-left-side {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .table-search-input {
            max-width: 100% !important;
          }
          .header-right-side {
            justify-content: flex-start !important;
          }
          .ant-card-body {
            padding: 8px !important;
          }
          .ant-table-pagination.ant-pagination {
            flex-direction: row !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
            gap: 4px !important;
            align-items: center !important;
            margin: 12px 0 !important;
            display: flex !important;
          }
          .ant-pagination-total-text {
            width: 100% !important;
            margin-right: 0 !important;
            text-align: center !important;
            font-size: 12px !important;
            order: -1 !important;
            margin-bottom: 8px !important;
          }
          .ant-pagination-options {
            margin: 0 !important;
            margin-top: 4px !important;
          }
          .ant-pagination-item, 
          .ant-pagination-prev, 
          .ant-pagination-next,
          .ant-pagination-jump-prev,
          .ant-pagination-jump-next {
            min-width: 30px !important;
            height: 30px !important;
            line-height: 28px !important;
            margin: 0 2px !important;
          }
        }
      `}</style>
    </Card>
  );
};

export default CommonTable;
