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
              icon={<EditOutlined style={{ color: "var(--blue-btn)" }} />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Bazar">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Bazar Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Open Time",
      dataIndex: "openTime",
      key: "openTime",
      render: (text: string, record: any) => (
        <span>
          {text} <Tag color="blue">{record.openFormat}</Tag>
        </span>
      ),
    },
    {
      title: "Close Time",
      dataIndex: "closeTime",
      key: "closeTime",
      render: (text: string, record: any) => (
        <span>
          {text} <Tag color="orange">{record.closeFormat}</Tag>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => (
        <Tag
          color={status === "active" ? "green" : "red"}
          style={{ borderRadius: "4px", textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns as any}
      dataSource={data}
      loading={loading}
      tableTitle="Bazar List"
      onRefresh={onRefresh}
      searchPlaceholder="Search by bazar name..."
      globalSearchKey={["name"]}
    />
  );
};

export default BazarTable;
