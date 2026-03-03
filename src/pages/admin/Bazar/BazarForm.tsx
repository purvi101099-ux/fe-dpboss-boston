import React, { useEffect } from "react";
import { Modal, Space } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseTime } from "@/utils/dateFunctions";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonTimePicker from "@/components/common/CommonTimePicker";
import CommonRadioGroup from "@/components/common/CommonRadioGroup";
import CommonLabel from "@/components/common/CommonLabel";
import { bazarSchema } from "@/utils/validation";
import { formatOptions, statusOptions } from "@/utils/constants";
import { BAZAR_MESSAGES } from "@/utils/message-const";

interface BazarFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  loading?: boolean;
}

interface IDefaultValues {
  name: string;
  openFormat: string;
  closeFormat: string;
  status: string;
  openTime: any;
  closeTime: any;
}
const defaultValues = {
  name: "",
  openFormat: "AM",
  closeFormat: "PM",
  status: "active",
  openTime: null,
  closeTime: null,
} as IDefaultValues;

const BazarForm: React.FC<BazarFormProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  loading,
}) => {
  const methods = useForm({
    resolver: yupResolver(bazarSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          ...initialData,
          openTime: parseTime(initialData.openTime),
          closeTime: parseTime(initialData.closeTime),
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, initialData, reset]);

  const onInternalSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <Modal
      title={
        initialData
          ? BAZAR_MESSAGES.FORM_TITLE_EDIT
          : BAZAR_MESSAGES.FORM_TITLE_ADD
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={600}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onInternalSubmit)}
          style={{ marginTop: 20 }}
        >
          <div style={{ marginBottom: 16 }}>
            <CommonLabel label="Bazar Name" required />
            <CommonInput name="name" placeholder="e.g. KALYAN DAY" />
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <CommonLabel label="Open Time" required />
                <CommonTimePicker name="openTime" />
              </div>
              <div>
                <CommonLabel label="Formatted Open" required />
                <CommonRadioGroup
                  name="openFormat"
                  options={formatOptions}
                  optionType="button"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <CommonLabel label="Close Time" required />
                <CommonTimePicker name="closeTime" />
              </div>
              <div>
                <CommonLabel label="Formatted Close" required />
                <CommonRadioGroup
                  name="closeFormat"
                  options={formatOptions}
                  optionType="button"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <CommonLabel label="Is Active" required />
            <CommonRadioGroup name="status" options={statusOptions} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Space>
              <CommonButton
                label="Cancel"
                onClick={onCancel}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--blue-btn)",
                  borderColor: "var(--blue-btn)",
                }}
              />
              <CommonButton
                label={
                  initialData
                    ? BAZAR_MESSAGES.FORM_SUBMIT_UPDATE
                    : BAZAR_MESSAGES.FORM_SUBMIT_ADD
                }
                htmlType="submit"
                loading={loading}
              />
            </Space>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default BazarForm;
