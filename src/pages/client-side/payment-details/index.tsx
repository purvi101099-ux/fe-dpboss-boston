import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { paymentDetailsSchema } from "@/utils/validation";
import { updatePaymentDetails, fetchPaymentDetails } from "@/api/payment";

interface IDefaultValues {
  gpayNumber: string | null;
  phonePeNumber: string | null;
  paytmNumber: string | null;
  upiId: string | null;
}

const defaultValues: IDefaultValues = {
  gpayNumber: null,
  phonePeNumber: null,
  paytmNumber: null,
  upiId: null,
};

const PaymentDetailsForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{ type: string; text: string } | null>(null);

  const methods = useForm<IDefaultValues>({
    resolver: yupResolver(paymentDetailsSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  // Load payment details on mount
  useEffect(() => {
    const loadPaymentDetails = async () => {
      try {
        const user = localStorage.getItem("user");
        const userData = user ? JSON.parse(user) : {};
        const userId = userData?.user_id;

        if (!userId) {
          setIsLoading(false);
          return;
        }

        const paymentData = await fetchPaymentDetails(userId);

        if (paymentData) {
          setValue("gpayNumber", paymentData.google_pay_number);
          setValue("phonePeNumber", paymentData.phone_pe_number);
          setValue("paytmNumber", paymentData.paytm_number);
          setValue("upiId", paymentData.upi_id);
        }
      } catch (error) {
        console.error("Failed to load payment details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentDetails();
  }, [setValue]);

  const onInternalSubmit = async (data: IDefaultValues) => {
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

      await updatePaymentDetails({
        user_id: userId,
        google_pay_number: data.gpayNumber ?? null,
        phone_pe_number: data.phonePeNumber ?? null,
        paytm_number: data.paytmNumber ?? null,
        upi_id: data.upiId ?? null,
      });

      setSubmitMessage({ type: "success", text: "Payment details updated successfully!" });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Failed to update payment details";
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
          <h1>Add Payment Details</h1>
          <p>Add your UPI and wallet payment details</p>
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
            <CommonLabel label="GPay Number" required />
            <CommonInput
              name="gpayNumber"
              placeholder="Enter Google Pay number"
            />

            <CommonLabel label="PhonePe Number" required />
            <CommonInput
              name="phonePeNumber"
              placeholder="Enter PhonePe number"
            />

            <CommonLabel label="Paytm Number" required />
            <CommonInput name="paytmNumber" placeholder="Enter Paytm number" />

            <CommonLabel label="UPI ID" required />
            <CommonInput name="upiId" placeholder="example@upi" />

            <CommonButton
              label={isSubmitting ? "Updating..." : "Save Payment Details"}
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

export default PaymentDetailsForm;
