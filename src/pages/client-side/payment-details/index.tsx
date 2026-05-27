import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { paymentDetailsSchema } from "@/utils/validation";

interface IDefaultValues {
  gpayNumber: string;
  phonePeNumber: string;
  paytmNumber: string;
  upiId: string;
}

const defaultValues: IDefaultValues = {
  gpayNumber: "",
  phonePeNumber: "",
  paytmNumber: "",
  upiId: "",
};

const PaymentDetailsForm: React.FC = () => {
  const methods = useForm<IDefaultValues>({
    resolver: yupResolver(paymentDetailsSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onInternalSubmit = (data: IDefaultValues) => {
    console.log(data);
  };

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>Add Payment Details</h1>
          <p>Add your UPI and wallet payment details</p>
        </div>

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
              label="Save Payment Details"
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

export default PaymentDetailsForm;
