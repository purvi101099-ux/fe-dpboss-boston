import React from "react";
import CommonButton from "@/components/common/commonButton";
import "@/styles/client-forms.css";
import "./withdraw-fund.css";

const WithdrawFund: React.FC = () => {
  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>Withdraw Fund</h1>
          <p className="subtitle">Send money to your bank account.</p>

          <div className="note-text-purple">
            <p>Withdrawal requests may take up to 24 hours.</p>
            <p>
              Your funds will be credited to your bank account within 24 hours.
              Please rest assured that your money is always safe with us.
            </p>
          </div>

          <div className="note-text-red">
            <p>Note: Sunday withdrawals are off</p>
          </div>

          <div className="note-text-red-bold">
            <p>
              NOTE: Kindly update your bank details first. then you can withdraw
              amount
            </p>
          </div>

          <div className="withdraw-footer">
            <p>Unable to Withdraw Fund?</p>
            <CommonButton
              label="Contact Admin"
              className="contact-admin-help-btn"
              block
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFund;
