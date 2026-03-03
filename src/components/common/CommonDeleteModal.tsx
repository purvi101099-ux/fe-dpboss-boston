import React from "react";
import { Modal, Typography, Space } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Text } = Typography;

interface CommonDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  content?: string;
  itemName?: string;
  loading?: boolean;
}

const CommonDeleteModal: React.FC<CommonDeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Confirm Delete",
  content = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  loading = false,
}) => {
  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />
          <span>{title}</span>
        </Space>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{ danger: true, loading }}
      cancelButtonProps={{ disabled: loading }}
      centered
    >
      <div style={{ padding: "8px 0" }}>
        <p>{content}</p>
        {itemName && (
          <Text strong type="danger">
            Item: {itemName}
          </Text>
        )}
      </div>
    </Modal>
  );
};

export default CommonDeleteModal;
