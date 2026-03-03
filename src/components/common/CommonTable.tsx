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
        body: { padding: "16px" },
      }}
      style={{
        borderRadius: token.borderRadiusLG,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Space direction="vertical" style={{ minWidth: 200 }}>
          {tableTitle && (
            <Text strong style={{ fontSize: "14px" }}>
              {tableTitle}
            </Text>
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
              style={{
                borderRadius: "6px",
                width: 250,
              }}
            />
          )}
        </Space>

        <Space wrap>
          {extra}
          {onRefresh && (
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              style={{ borderRadius: "6px" }}
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
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          ...pagination,
        }}
        scroll={{ x: "max-content" }}
        size="small"
        locale={{
          emptyText: <Empty description="No data found" />,
        }}
        style={{
          background: token.colorBgContainer,
        }}
        {...rest}
      />
    </Card>
  );
};

export default CommonTable;
