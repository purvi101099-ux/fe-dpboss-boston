import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { bankDetailsSchema } from "@/utils/validation";
import { BANK_MESSAGES } from "@/utils/message-const";

interface BankDetailsFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialData?: any;
  loading?: boolean;
}

interface IDefaultValues {
  beneficiaryName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

const defaultValues: IDefaultValues = {
  beneficiaryName: "",
  accountNumber: "",
  ifscCode: "",
  bankName: "",
};

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  open,
  onCancel,
  onSubmit,
  initialData,
  loading,
}) => {
  const methods = useForm({
    resolver: yupResolver(bankDetailsSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          beneficiaryName: initialData.beneficiaryName || "",
          accountNumber: initialData.accountNumber || "",
          ifscCode: initialData.ifscCode || "",
          bankName: initialData.bankName || "",
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
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>
            {initialData
              ? BANK_MESSAGES.FORM_TITLE_EDIT
              : BANK_MESSAGES.FORM_TITLE_ADD}
          </h1>
          <p>Provide Valid Bank Details</p>
        </div>

        <FormProvider {...methods}>
          <form
            className="client-form"
            onSubmit={handleSubmit(onInternalSubmit)}
          >
            <CommonLabel label="A/c Holder Name" required />
            <CommonInput
              name="beneficiaryName"
              placeholder="Beneficiary name"
            />
            <CommonLabel label="Bank Name" required />
            <CommonInput
              name="bankName"
              placeholder="HDFC / SBI / Bank of India"
            />
            <CommonLabel label="Bank Account Number" required />
            <CommonInput name="accountNumber" placeholder="950000124587" />

            <CommonLabel label="IFSC Code" required />
            <CommonInput name="ifscCode" placeholder="HDFC0000139" />

            <CommonButton
              label={
                initialData
                  ? BANK_MESSAGES.FORM_SUBMIT_UPDATE
                  : BANK_MESSAGES.FORM_SUBMIT_ADD
              }
              htmlType="submit"
              loading={loading}
              block
              className="client-submit-btn"
            />
          </form>
        </FormProvider>
        <p className="client-update-text">Unable to update?</p>
        <CommonButton
          label="Contact Admin"
          className="client-contact-admin"
          variant="outlined"
          block
        />
      </div>
    </div>
  );
};

export default BankDetailsForm;
