import React, { useState, useMemo } from "react";
import { message } from "antd";
import { ShopOutlined, PlusOutlined } from "@ant-design/icons";
import CommonDeleteModal from "@/components/common/CommonDeleteModal";
import useModal from "@/hooks/useModal";
import BazarTable from "@/pages/admin/Bazar/BazarTable";
import BazarForm from "@/pages/admin/Bazar/BazarForm";
import { formatTime } from "@/utils/dateFunctions";
import CommonPageHeader from "@/components/common/CommonPageHeader";
import { BAZAR_MESSAGES } from "@/utils/message-const";

const BazarManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const editModal = useModal<any>();
  const deleteModal = useModal<any>();

  const initialData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      key: `${i + 1}`,
      name:
        [
          "KALYAN",
          "MAIN BAZAR",
          "MILAN DAY",
          "MILAN NIGHT",
          "RAJDHANI DAY",
          "SRIDEVI",
          "TIME BAZAR",
          "MADHUR NIGHT",
        ][i % 8] + ` ${Math.floor(i / 8) + 1}`,
      openTime: "10:30",
      closeTime: "22:30",
      openFormat: i % 2 === 0 ? "AM" : "PM",
      closeFormat: "PM",
      status: i % 3 === 0 ? "inactive" : "active",
    }));
  }, []);

  const [data, setData] = useState<any[]>(initialData);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(BAZAR_MESSAGES.REFRESH_SUCCESS);
    }, 1000);
  };

  const handleFormSubmit = (values: any) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      openTime: formatTime(values.openTime),
      closeTime: formatTime(values.closeTime),
    };

    setTimeout(() => {
      if (editModal.data) {
        // Edit mode
        setData((prev) =>
          prev.map((item) =>
            item.key === editModal.data.key
              ? { ...item, ...formattedValues }
              : item,
          ),
        );
        message.success(BAZAR_MESSAGES.UPDATE_SUCCESS);
      } else {
        // Add mode
        const newBazar = {
          key: Date.now().toString(),
          ...formattedValues,
        };
        setData((prev) => [newBazar, ...prev]);
        message.success(BAZAR_MESSAGES.CREATE_SUCCESS);
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
      message.success(BAZAR_MESSAGES.DELETE_SUCCESS(deleteModal.data.name));
    }, 800);
  };

  return (
    <div>
      <CommonPageHeader
        title={BAZAR_MESSAGES.PAGE_TITLE}
        icon={<ShopOutlined />}
        buttonLabel={BAZAR_MESSAGES.CREATE_BUTTON}
        buttonIcon={<PlusOutlined />}
        onButtonClick={() => editModal.openModal()}
      />

      <BazarTable
        data={data}
        loading={loading}
        onEdit={editModal.openModal}
        onDelete={deleteModal.openModal}
        onRefresh={handleRefresh}
      />

      <BazarForm
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
        itemName={deleteModal.data?.name}
        loading={loading}
      />
    </div>
  );
};

export default BazarManagement;
