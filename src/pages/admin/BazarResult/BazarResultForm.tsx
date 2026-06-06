import React, { useEffect } from "react";
import { Modal, Space } from "antd";
import { useForm, FormProvider, Watch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonRadioGroup from "@/components/common/CommonRadioGroup";
import CommonLabel from "@/components/common/CommonLabel";
import CommonDatePicker from "@/components/common/CommonDatePicker";
import CommonSelect from "@/components/common/CommonSelect";
import { bazarResultSchema } from "@/utils/validation";
import { luckyOptions, bazarNames } from "@/utils/constants";
import { BAZAR_RESULT_MESSAGES } from "@/utils/message-const";

interface BazarResultFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  loading?: boolean;
  bazars: any[];
}

interface IDefaultValues {
  name: string; // This will store game_id
  openNumber: string;
  closeNumber: string;
  jodiNumber: string;
  date: any;
  isLucky: string;
}

const defaultValues: IDefaultValues = {
  name: "",
  openNumber: "",
  closeNumber: "",
  jodiNumber: "",
  date: null,
  isLucky: "no",
};

const BazarResultForm: React.FC<BazarResultFormProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  loading,
  bazars,
}) => {
  const methods = useForm<IDefaultValues>({
    resolver: yupResolver(bazarResultSchema) as any,
    defaultValues,
  });

  console.log("BazarResultForm rendered with initialData:", initialData);

  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (open) {
      if (initialData) {
        const parts = initialData.value ? initialData.value.split("-") : [];
        reset({
          name: bazars?.find((b) => b.bazarName === initialData.game)?.bazarId,
          openNumber: initialData.first_number || parts[0] || "",
          closeNumber: initialData.second_number || parts[2] || "",
          jodiNumber: initialData.jodi_number || parts[1] || "",
          date: initialData.result_date
            ? new Date(initialData.result_date)
            : null,
          isLucky: initialData.jodi_luck === 1 ? "yes" : "no",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, initialData, reset, bazars]);

  const onInternalSubmit = (data: any) => {
    onSubmit(data);
  };
  const bazarOptions = bazars.map((b) => ({
    label: b?.bazarName || "Unknown Bazar",
    value: b?.bazarId,
  }));

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
              ? BAZAR_RESULT_MESSAGES.FORM_TITLE_EDIT
              : BAZAR_RESULT_MESSAGES.FORM_TITLE_ADD}
          </span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onInternalSubmit)}
          style={{ marginTop: 20 }}
        >
          <div style={{ marginBottom: 16 }}>
            <CommonLabel label="Bazar Name" required />
            <CommonSelect
              name="name"
              options={bazarOptions}
              placeholder="Select Bazar"
              disabled={initialData}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <CommonLabel label="Result Date" required />
            <CommonDatePicker name="date" placeholder="Select date" disabled={initialData} />
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
              <CommonLabel label="Open Number" required />
              <CommonInput
                name="openNumber"
                placeholder="e.g. 123"
                type="number"
              />
            </div>
            <div style={{ flex: 1 }}>
              <CommonLabel label="Close Number" required />
              <CommonInput
                name="closeNumber"
                placeholder="e.g. 456"
                type="number"
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <CommonLabel label="Jodi Number" required />
            <CommonInput name="jodiNumber" placeholder="e.g. 50" />
          </div>

          <div style={{ marginBottom: 24 }}>
            <CommonLabel label="Is Lucky Result?" required />
            <CommonRadioGroup name="isLucky" options={luckyOptions} />
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
                    ? BAZAR_RESULT_MESSAGES.FORM_SUBMIT_UPDATE
                    : BAZAR_RESULT_MESSAGES.FORM_SUBMIT_ADD
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

export default BazarResultForm;
