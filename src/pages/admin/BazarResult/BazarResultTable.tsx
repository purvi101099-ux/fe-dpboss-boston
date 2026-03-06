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
      dataIndex: "game",
      key: "name",
      sorter: (a: any, b: any) => {
        const nameA = a.game || a.bazar?.bazarName || "";
        const nameB = b.game || b.bazar?.bazarName || "";
        return nameA.localeCompare(nameB);
      },
      render: (text: string, record: any) => (
        <span style={{ fontWeight: 600 }}>
          {text || record.bazar?.bazarName || "Unknown"}
        </span>
      ),
    },
    {
      title: "Time",
      key: "time",
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0} style={{ fontSize: "12px" }}>
          <span style={{ color: "#52c41a" }}>{record.timeOpen || "-"}</span>
          <span style={{ color: "#f5222d" }}>{record.timeClose || "-"}</span>
        </Space>
      ),
    },
    {
      title: "Open No",
      dataIndex: "first_number",
      key: "openNumber",
      align: "center",
      render: (text: string, record: any) => {
        let val = text;
        if (!val && record.value) {
          val = record.value.split("-")[0];
        }
        return <Tag color="blue">{val || "-"}</Tag>;
      },
    },
    {
      title: "Close No",
      dataIndex: "second_number",
      key: "closeNumber",
      align: "center",
      render: (text: string, record: any) => {
        let val = text;
        if (!val && record.value) {
          val = record.value.split("-")[2];
        }
        if (!val || val === "") return "-";
        return <Tag color="orange">{val}</Tag>;
      },
    },
    {
      title: "Jodi",
      dataIndex: "jodi_number",
      key: "jodiNumber",
      align: "center",
      render: (text: string, record: any) => {
        let val = text;
        if (!val && record.value) {
          val = record.value.split("-")[1];
        }
        if (!val || val === "") return "-";
        if (val === "0" || val === "00") {
          return <span style={{ fontWeight: "bold" }}>{val}</span>;
        }
        return (
          <Tag color="purple" style={{ fontWeight: "bold" }}>
            {val}
          </Tag>
        );
      },
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
      globalSearchKey={["game"]}
    />
  );
};

export default BazarResultTable;
