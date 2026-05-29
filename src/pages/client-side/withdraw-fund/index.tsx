import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import "@/styles/client-forms.css";
import "./withdraw-fund.css";
import { WITHDRAW_FUND_MESSAGES } from "@/utils/message-const";
import { withdrawFundSchema } from "@/utils/validation";

const WithdrawFund: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(withdrawFundSchema),
    defaultValues: {
      amount: "" as any,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log("Withdraw Fund Submitted:", data);
  };

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>{WITHDRAW_FUND_MESSAGES.PAGE_TITLE}</h1>

          <p className="subtitle">{WITHDRAW_FUND_MESSAGES.PAGE_SUBTITLE}</p>

          <div className="note-text-purple">
            <p>{WITHDRAW_FUND_MESSAGES.INFO_MESSAGE}</p>
            <p>{WITHDRAW_FUND_MESSAGES.INFO_DESCRIPTION}</p>
          </div>

          <div className="note-text-red">
            <p>{WITHDRAW_FUND_MESSAGES.SUNDAY_NOTE}</p>
          </div>

          <div className="note-text-red-bold">
            <p>{WITHDRAW_FUND_MESSAGES.BANK_DETAILS_NOTE}</p>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            className="client-form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: "20px" }}
          >
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <CommonInput
                name="amount"
                placeholder="Enter Amount"
                type="number"
              />
            </div>

            <CommonButton
              label="Submit"
              htmlType="submit"
              block
              className="client-submit-btn"
            />
          </form>
        </FormProvider>

        <div className="withdraw-footer">
          <p>{WITHDRAW_FUND_MESSAGES.CONTACT_TEXT}</p>

          <CommonButton
            label={WITHDRAW_FUND_MESSAGES.CONTACT_BUTTON}
            className="client-contact-admin"
            variant="outlined"
            block
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawFund;

