import React from "react";
import { Tag, Space, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonTable from "@/components/common/CommonTable";

interface BazarTableProps {
  data: any[];
  loading?: boolean;
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onRefresh: () => void;
}

const BazarTable: React.FC<BazarTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const columns = [
    {
      title: "Action",
      key: "action",
      width: 10,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Edit Bazar">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "var(--blue-btn)", fontSize: "15px" }} />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          {/* <Tooltip title="Delete Bazar">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            />
          </Tooltip> */}
        </Space>
      ),
    },
    {
      title: "Bazar Name",
      dataIndex: "bazarName",
      key: "bazarName",
      sorter: (a: any, b: any) => a.bazarName.localeCompare(b.bazarName),
      render: (text: string) => <span style={{ fontWeight: 600 ,fontSize: "15px"}}>{text}</span>,
    },
    {
      title: "Open Time",
      dataIndex: "openTime",
      key: "openTime",
      sorter: (a: any, b: any) => a.openTime.localeCompare(b.openTime),
      render: (text: string, record: any) => (
        <span style={{fontSize: "15px"}}>
          {text} &nbsp;{record.formatOpenTime}
        </span>
      ),
    },
    {
      title: "Close Time",
      dataIndex: "closeTime",
      key: "closeTime",
      sorter: (a: any, b: any) => a.closeTime.localeCompare(b.closeTime),
      render: (text: string, record: any) => (
        <span style={{fontSize: "15px"}}>
          {text} &nbsp;{record.formatCloseTime}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
      onFilter: (value: any, record: any) => record.isActive === value,
      render: (status: number) => (
        <Tag
          color={status === 1 ? "green" : "red"}
          style={{ borderRadius: "4px", textTransform: "capitalize",fontSize: "15px" }}
        >
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns as any}
      dataSource={data}
      rowKey="bazarId"
      loading={loading}
      tableTitle="Bazar List"
      onRefresh={onRefresh}
      searchPlaceholder="Search by bazar name..."
      globalSearchKey={["bazarName"]}
    />
  );
};

export default BazarTable;
