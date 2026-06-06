import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { bankDetailsSchema } from "@/utils/validation";
import { BANK_MESSAGES } from "@/utils/message-const";
import { updateBankDetails, fetchBankDetails } from "@/api/bank";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{ type: string; text: string } | null>(null);
  
  const methods = useForm({
    resolver: yupResolver(bankDetailsSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  // Load bank details on mount
  useEffect(() => {
    const loadBankDetails = async () => {
      try {
        const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : {};
        const userId = userData?.user_id;

        if (!userId) {
          setIsLoading(false);
          return;
        }

        const bankData = await fetchBankDetails(userId);

        if (bankData) {
          setValue("beneficiaryName", bankData.account_holder_name);
          setValue("bankName", bankData.bank_name);
          setValue("accountNumber", bankData.account_number);
          setValue("ifscCode", bankData.ifsc_code);
        }
      } catch (error) {
        console.error("Failed to load bank details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBankDetails();
  }, [setValue]);

  const onInternalSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage(null);

      const user = localStorage.getItem("user");
      const userData = user ? JSON.parse(user) : {};
      const userId = userData?.user_id;

      if (!userId) {
        setSubmitMessage({ type: "error", text: "User ID not found" });
        return;
      }

      await updateBankDetails({
        user_id: userId,
        account_holder_name: data.beneficiaryName,
        bank_name: data.bankName,
        account_number: data.accountNumber,
        ifsc_code: data.ifscCode,
      });

      setSubmitMessage({ type: "success", text: "Bank details updated successfully!" });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Failed to update bank details";
      setSubmitMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="client-form-page">
        <div className="client-form-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>{BANK_MESSAGES.FORM_TITLE_ADD}</h1>
          <p>Provide Valid Bank Details</p>
        </div>

        {submitMessage && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "4px",
              backgroundColor: submitMessage.type === "success" ? "#d4edda" : "#f8d7da",
              color: submitMessage.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${submitMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
            }}
          >
            {submitMessage.text}
          </div>
        )}

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
              label={isSubmitting ? "Updating..." : BANK_MESSAGES.FORM_SUBMIT_ADD}
              htmlType="submit"
              block
              className="client-submit-btn"
              disabled={isSubmitting}
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
