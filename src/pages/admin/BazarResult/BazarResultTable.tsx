import React from "react";
import { Tag, Space, Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, StarFilled } from "@ant-design/icons";
import CommonTable from "@/components/common/CommonTable";
import moment from "moment";

interface BazarResultTableProps {
  data: any[];
  loading?: boolean;
  onEdit: (record: any) => void;
  onDelete: (record: any) => void;
  onRefresh: () => void;
}

const BazarResultTable: React.FC<BazarResultTableProps> = ({
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
          <Tooltip title="Edit Result">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "var(--blue-btn)" }} />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Result">
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: any) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Open No",
      dataIndex: "openNumber",
      key: "openNumber",
      align: "center",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Close No",
      dataIndex: "closeNumber",
      key: "closeNumber",
      align: "center",
      render: (text: string) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: "Jodi",
      dataIndex: "jodiNumber",
      key: "jodiNumber",
      align: "center",
      render: (text: string) => (
        <Tag color="purple" style={{ fontWeight: "bold" }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Lucky",
      dataIndex: "isLucky",
      key: "isLucky",
      align: "center",
      render: (isLucky: string) => (
        <Space>
          {isLucky === "yes" ? (
            <Tag color="gold" icon={<StarFilled />}>
              Lucky
            </Tag>
          ) : (
            <Tag color="default">No</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns as any}
      dataSource={data}
      loading={loading}
      tableTitle="Bazar Result List"
      onRefresh={onRefresh}
      searchPlaceholder="Search by bazar name..."
      globalSearchKey={["name"]}
    />
  );
};

export default BazarResultTable;
