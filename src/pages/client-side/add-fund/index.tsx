import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "antd";
import { addFundSchema } from "@/utils/validation";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import "@/styles/client-forms.css";
import "./add-fund.css";

interface AddFundForm {
  amount: number | string;
  paymentMethod: string;
}

const AddFund: React.FC = () => {
  const methods = useForm<AddFundForm>({
    resolver: yupResolver(addFundSchema),
    defaultValues: {
      amount: "",
      paymentMethod: "Direct UPI",
    },
  });

  const { setValue, control } = methods;

  const onSubmit = (data: AddFundForm) => {
    console.log("Add Fund Submitted:", data);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>Add Fund via UPI</h1>
          <p className="subtitle">Add points to your wallet.</p>
          <div className="note-text">
            <p>
              Payment add krne ke 5 minute ke andar aapke wallet me points add
              ho jayenge.
            </p>
            <p>Dont worry Wait kriye.</p>
            <p>Your money is always safe with Dpboss Play</p>
          </div>
        </div>

        <div className="divider" />

        <FormProvider {...methods}>
          <form
            className="client-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="form-group center-label">
              <label className="form-label-red">Enter Amount</label>
              <CommonInput
                name="amount"
                placeholder="Enter Amount"
                type="number"
              />
            </div>

            <div className="quick-amounts">
              {quickAmounts.map((amt) => (
                <div
                  key={amt}
                  className="amount-chip"
                  onClick={() =>
                    setValue("amount", amt, { shouldValidate: true })
                  }
                >
                  ₹ {amt}
                </div>
              ))}
            </div>

            <div className="form-group">
              <Select
                defaultValue="Direct UPI"
                className="custom-select"
                onChange={(val) => setValue("paymentMethod", val)}
                options={[{ value: "Direct UPI", label: "Direct UPI" }]}
              />
            </div>

            <CommonButton
              label="Add Points"
              htmlType="submit"
              block
              className="client-submit-btn"
              style={{ marginTop: "10px" }}
            />

            <div className="add-fund-footer">
              <p>Unable to Add Fund?</p>
              <CommonButton
                label="Contact Admin for help"
                className="contact-admin-help-btn"
                block
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddFund;
