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
      dataIndex: ["bazar", "bazarName"],
      key: "name",
      sorter: (a: any, b: any) => {
        const nameA = a.bazar?.bazarName || a.game || "";
        const nameB = b.bazar?.bazarName || b.game || "";
        return nameA.localeCompare(nameB);
      },
      render: (text: string, record: any) => (
        <span style={{ fontWeight: 600 }}>
          {text || record.game || "Unknown"}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      sorter: (a: any, b: any) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      render: (date: any) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Open No",
      dataIndex: "first_number",
      key: "openNumber",
      align: "center",
      sorter: (a: any, b: any) =>
        Number(a.first_number) - Number(b.first_number),
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Close No",
      dataIndex: "second_number",
      key: "closeNumber",
      align: "center",
      sorter: (a: any, b: any) =>
        Number(a.second_number) - Number(b.second_number),
      render: (text: string) => <Tag color="orange">{text}</Tag>,
    },
    {
      title: "Jodi",
      dataIndex: "jodi_number",
      key: "jodiNumber",
      align: "center",
      sorter: (a: any, b: any) => Number(a.jodi_number) - Number(b.jodi_number),
      render: (text: string) => (
        <Tag color="purple" style={{ fontWeight: "bold" }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Lucky",
      dataIndex: "jodi_luck",
      key: "isLucky",
      align: "center",
      sorter: (a: any, b: any) => a.jodi_luck - b.jodi_luck,
      render: (luck: number) => (
        <Space>
          {luck === 1 ? (
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
      rowKey="id"
      loading={loading}
      tableTitle="Bazar Result List"
      onRefresh={onRefresh}
      searchPlaceholder="Search by bazar name..."
      globalSearchKey={["bazar.bazarName"]}
    />
  );
};

export default BazarResultTable;
