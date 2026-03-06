import React, { useMemo } from "react";
import { message } from "antd";
import { ShopOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CommonDeleteModal from "@/components/common/CommonDeleteModal";
import useModal from "@/hooks/useModal";
import BazarTable from "@/pages/admin/Bazar/BazarTable";
import BazarForm from "@/pages/admin/Bazar/BazarForm";
import { formatTime } from "@/utils/dateFunctions";
import CommonPageHeader from "@/components/common/CommonPageHeader";
import { BAZAR_MESSAGES } from "@/utils/message-const";
import { getBazar, addBazar, updateBazar, deleteBazar } from "@/api/game";
import {
  AddBazarRequest,
  UpdateBazarRequest,
  DeleteBazarRequest,
} from "@/api/types";

const BazarManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const editModal = useModal<any>();
  const deleteModal = useModal<any>();

  // Fetch data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: getBazar,
  });

  // Defensive check to ensure we pass an array to the table
  const bazarData = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // Handle nested data if API returns an object (e.g., { games: [...] } or { data: [...] })
    const results =
      (data as any).games ||
      (data as any).data ||
      (data as any).bazar ||
      (data as any).gamelist ||
      [];
    return Array.isArray(results) ? results : [];
  }, [data]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (values: AddBazarRequest) => addBazar(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      message.success(BAZAR_MESSAGES.CREATE_SUCCESS);
      editModal.closeModal();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to create bazar");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (values: UpdateBazarRequest) => updateBazar(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      message.success(BAZAR_MESSAGES.UPDATE_SUCCESS);
      editModal.closeModal();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to update bazar");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (payload: DeleteBazarRequest) => deleteBazar(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      message.success(
        BAZAR_MESSAGES.DELETE_SUCCESS(deleteModal.data?.bazarName || "Bazar"),
      );
      deleteModal.closeModal();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to delete bazar");
    },
  });

  const handleFormSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      open_time: formatTime(values.open_time),
      close_time: formatTime(values.close_time),
    };

    if (editModal.data?.bazarId) {
      // Edit mode
      updateMutation.mutate({
        id: editModal.data.bazarId,
        ...formattedValues,
      });
    } else {
      // Add mode
      createMutation.mutate(formattedValues);
    }
  };

  const confirmDelete = () => {
    if (deleteModal.data?.bazarId) {
      deleteMutation.mutate({ id: deleteModal.data.bazarId });
    }
  };

  const isActionLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
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
        data={bazarData}
        loading={isLoading}
        onEdit={editModal.openModal}
        onDelete={deleteModal.openModal}
        onRefresh={() => refetch()}
      />

      <BazarForm
        open={editModal.isOpen}
        onCancel={editModal.closeModal}
        onSubmit={handleFormSubmit}
        initialData={editModal.data}
        loading={isActionLoading}
      />

      <CommonDeleteModal
        open={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={deleteModal.closeModal}
        itemName={deleteModal.data?.bazarName}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default BazarManagement;
