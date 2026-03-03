import { useState, useCallback } from "react";

export interface ModalState<T = any> {
  open: boolean;
  data: T | null;
}

export const useModal = <T = any>() => {
  const [modalState, setModalState] = useState<ModalState<T>>({
    open: false,
    data: null,
  });

  const openModal = useCallback((data: T | null = null) => {
    setModalState({
      open: true,
      data,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const clearData = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      data: null,
    }));
  }, []);

  return {
    isOpen: modalState.open,
    data: modalState.data,
    openModal,
    closeModal,
    clearData,
  };
};

export default useModal;
