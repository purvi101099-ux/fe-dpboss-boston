import React, { useState, useMemo } from "react";
import { message } from "antd";
import {
  ShopOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import CommonDeleteModal from "@/components/common/CommonDeleteModal";
import useModal from "@/hooks/useModal";
import CommonPageHeader from "@/components/common/CommonPageHeader";
import { BAZAR_RESULT_MESSAGES } from "@/utils/message-const";
import BazarResultTable from "./BazarResultTable";
import BazarResultForm from "./BazarResultForm";
import moment from "moment";

const BazarResultManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const editModal = useModal<any>();
  const deleteModal = useModal<any>();

  const initialData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      key: `${i + 1}`,
      name: ["KALYAN", "MAIN BAZAR", "MILAN DAY", "SRIDEVI"][i % 4],
      date: moment().subtract(i, "days").toDate(),
      openNumber: Math.floor(100 + Math.random() * 900).toString(),
      closeNumber: Math.floor(100 + Math.random() * 900).toString(),
      jodiNumber: Math.floor(10 + Math.random() * 90).toString(),
      isLucky: i % 5 === 0 ? "yes" : "no",
    }));
  }, []);

  const [data, setData] = useState<any[]>(initialData);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(BAZAR_RESULT_MESSAGES.REFRESH_SUCCESS);
    }, 1000);
  };

  const handleFormSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      if (editModal.data) {
        // Edit mode
        setData((prev) =>
          prev.map((item) =>
            item.key === editModal.data.key ? { ...item, ...values } : item,
          ),
        );
        message.success(BAZAR_RESULT_MESSAGES.UPDATE_SUCCESS);
      } else {
        // Add mode
        const newResult = {
          key: Date.now().toString(),
          ...values,
        };
        setData((prev) => [newResult, ...prev]);
        message.success(BAZAR_RESULT_MESSAGES.CREATE_SUCCESS);
      }
      setLoading(false);
      editModal.closeModal();
    }, 800);
  };

  const confirmDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) =>
        prev.filter((item) => item.key !== deleteModal.data.key),
      );
      setLoading(false);
      deleteModal.closeModal();
      message.success(
        BAZAR_RESULT_MESSAGES.DELETE_SUCCESS(deleteModal.data.name),
      );
    }, 800);
  };

  return (
    <div>
      <CommonPageHeader
        title={BAZAR_RESULT_MESSAGES.PAGE_TITLE}
        icon={<UnorderedListOutlined />}
        buttonLabel={BAZAR_RESULT_MESSAGES.CREATE_BUTTON}
        buttonIcon={<PlusOutlined />}
        onButtonClick={() => editModal.openModal()}
      />

      <BazarResultTable
        data={data}
        loading={loading}
        onEdit={editModal.openModal}
        onDelete={deleteModal.openModal}
        onRefresh={handleRefresh}
      />

      <BazarResultForm
        open={editModal.isOpen}
        onCancel={editModal.closeModal}
        onSubmit={handleFormSubmit}
        initialData={editModal.data}
        loading={loading}
      />

      <CommonDeleteModal
        open={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={deleteModal.closeModal}
        itemName={`result for ${deleteModal.data?.name}`}
        loading={loading}
      />
    </div>
  );
};

export default BazarResultManagement;
