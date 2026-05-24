import React from "react";
import CommonButton from "@/components/common/commonButton";
import "@/styles/client-forms.css";
import "./withdraw-fund.css";
import { WITHDRAW_FUND_MESSAGES } from "@/utils/message-const";

const WithdrawFund: React.FC = () => {
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

          <p className="client-update-text">
            {WITHDRAW_FUND_MESSAGES.CONTACT_TEXT}
          </p>

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
