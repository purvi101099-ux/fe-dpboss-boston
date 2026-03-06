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
  format_open_time: string;
  format_close_time: string;
  is_active: string;
  open_time: any;
  close_time: any;
}
const defaultValues = {
  name: "",
  format_open_time: "AM",
  format_close_time: "PM",
  is_active: "1",
  open_time: null,
  close_time: null,
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
          name: initialData.bazarName || "",
          open_time: initialData.openTime
            ? parseTime(initialData.openTime)
            : null,
          close_time: initialData.closeTime
            ? parseTime(initialData.closeTime)
            : null,
          format_open_time: initialData.formatOpenTime || "AM",
          format_close_time: initialData.formatCloseTime || "PM",
          is_active: initialData.isActive?.toString() || "1",
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "4px",
              height: "18px",
              background: "var(--pink-logo)",
              borderRadius: "2px",
            }}
          />
          <span>
            {initialData
              ? BAZAR_MESSAGES.FORM_TITLE_EDIT
              : BAZAR_MESSAGES.FORM_TITLE_ADD}
          </span>
        </div>
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
                <CommonTimePicker name="open_time" />
              </div>
              <div>
                <CommonLabel label="Formatted Open" required />
                <CommonRadioGroup
                  name="format_open_time"
                  options={formatOptions}
                  optionType="button"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <CommonLabel label="Close Time" required />
                <CommonTimePicker name="close_time" />
              </div>
              <div>
                <CommonLabel label="Formatted Close" required />
                <CommonRadioGroup
                  name="format_close_time"
                  options={formatOptions}
                  optionType="button"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <CommonLabel label="Is Active" required />
            <CommonRadioGroup name="is_active" options={statusOptions} />
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
