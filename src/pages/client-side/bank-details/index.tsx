import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { bankDetailsSchema } from "@/utils/validation";
import { BANK_MESSAGES } from "@/utils/message-const";

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

const BankDetailsForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(bankDetailsSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onInternalSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>{BANK_MESSAGES.FORM_TITLE_ADD}</h1>
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
              label={BANK_MESSAGES.FORM_SUBMIT_ADD}
              htmlType="submit"
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
