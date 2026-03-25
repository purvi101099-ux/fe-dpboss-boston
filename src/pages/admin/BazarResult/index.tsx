import React, { useMemo } from "react";
import { message } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CommonDeleteModal from "@/components/common/CommonDeleteModal";
import useModal from "@/hooks/useModal";
import CommonPageHeader from "@/components/common/CommonPageHeader";
import { BAZAR_RESULT_MESSAGES } from "@/utils/message-const";
import BazarResultTable from "./BazarResultTable";
import BazarResultForm from "./BazarResultForm";
import {
  getGameNumbers,
  addGameNumber,
  updateGameNumber,
} from "@/api/gameNumber";
import { getBazar } from "@/api/game";
import moment from "moment";
import { AddGameNumberRequest, UpdateGameNumberRequest } from "@/api/types";

const BazarResultManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const editModal = useModal<any>();
  const deleteModal = useModal<any>();

  // Fetch results
  const {
    data: resultsResponse,
    isLoading: isLoadingResults,
    refetch,
  } = useQuery({
    queryKey: ["game-numbers", "all"],
    queryFn: () => getGameNumbers({ type: "all", page: 1, limit: 100 }),
  });

  // Fetch bazars (needed for the form dropdown)
  const { data: bazarsResponse } = useQuery({
    queryKey: ["games"],
    queryFn: getBazar,
  });

  // Process results data
  const resultsData = useMemo(() => {
    if (!resultsResponse) return [];
    const rawData = (resultsResponse as any).data || resultsResponse;
    return Array.isArray(rawData) ? rawData : [];
  }, [resultsResponse]);

  // Process bazars data for the form
  const bazars = useMemo(() => {
    if (!bazarsResponse) return [];
    const rawData =
      (bazarsResponse as any).games ||
      (bazarsResponse as any).data ||
      bazarsResponse;
    return Array.isArray(rawData) ? rawData : [];
  }, [bazarsResponse]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (values: AddGameNumberRequest) => addGameNumber(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-numbers"] });
      message.success(BAZAR_RESULT_MESSAGES.CREATE_SUCCESS);
      editModal.closeModal();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to add result");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (values: UpdateGameNumberRequest) => updateGameNumber(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game-numbers"] });
      message.success(BAZAR_RESULT_MESSAGES.UPDATE_SUCCESS);
      editModal.closeModal();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Failed to update result");
    },
  });

  const handleFormSubmit = (values: any) => {
    const payload = {
      game_id: Number(values.name), // In the form 'name' will be market ID
      first_number: values.openNumber,
      second_number: values.closeNumber,
      jodi_number: values.jodiNumber,
      jodi_luck: values.isLucky === "yes" ? 1 : 0,
      created_at: moment(values.date).format("YYYY-MM-DD"),
    };

    if (editModal.data?.record_id) {
      updateMutation.mutate({
        id: editModal.data.record_id ,
        ...payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const confirmDelete = () => {
    // Note: User hasn't provided Delete API for results yet in the prompt,
    // but we have deleteBazar. I'll stick to what we have or just mock it for now
    // until the user provides the Delete Result endpoint.
    message.warning("Delete API for results not yet implemented in backend");
    deleteModal.closeModal();
  };

  const isActionLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <CommonPageHeader
        title={BAZAR_RESULT_MESSAGES.PAGE_TITLE}
        icon={<UnorderedListOutlined />}
        // buttonLabel={BAZAR_RESULT_MESSAGES.CREATE_BUTTON}
        buttonIcon={<PlusOutlined />}
        // onButtonClick={() => editModal.openModal()}
      />

      <BazarResultTable
        data={resultsData}
        loading={isLoadingResults}
        onEdit={editModal.openModal}
        onDelete={deleteModal.openModal}
        onRefresh={() => refetch()}
      />

      <BazarResultForm
        open={editModal.isOpen}
        onCancel={editModal.closeModal}
        onSubmit={handleFormSubmit}
        initialData={editModal.data}
        loading={isActionLoading}
        bazars={bazars}
      />

      <CommonDeleteModal
        open={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={deleteModal.closeModal}
        itemName={`result for ${deleteModal.data?.bazar?.bazarName || "Bazar"}`}
        loading={false}
      />
    </div>
  );
};

export default BazarResultManagement;
