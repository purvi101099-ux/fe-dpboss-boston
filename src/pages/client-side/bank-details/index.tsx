import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankDetailsSchema } from "@/utils/validation";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import "./bank-details.css";

interface BankDetailsForm {
  beneficiaryName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

const BankDetails: React.FC = () => {
  const methods = useForm<BankDetailsForm>({
    resolver: yupResolver(bankDetailsSchema),
  });

  const onSubmit = (data: BankDetailsForm) => {
    console.log("Bank Details Submitted:", data);
  };

  return (
    <div className="bank-details-page">
      <div className="bank-details-card">
        <div className="bank-details-header">
          <h1>Bank Details</h1>
          <p>Provide Valid Bank Details</p>
        </div>

        <FormProvider {...methods}>
          <form className="bank-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">A/c Holder Name:</label>
                <CommonInput
                  name="beneficiaryName"
                  placeholder="Beneficiary name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bank Name:</label>
                <CommonInput
                  name="bankName"
                  placeholder="HDFC/SBI/Bank of india"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Bank Account Number:</label>
                <CommonInput name="accountNumber" placeholder="950000124587" />
              </div>

              <div className="form-group">
                <label className="form-label">IFSC Code:</label>
                <CommonInput name="ifscCode" placeholder="HDFC0000139" />
              </div>
            </div>

            <CommonButton
              label="Submit"
              htmlType="submit"
              block
              className="submit-btn"
              style={{ height: "48px", marginTop: "10px" }}
            />
          </form>
        </FormProvider>

        <div className="support-section">
          <p>Unable to update?</p>
          <CommonButton
            label="Contact Admin"
            className="contact-admin-btn"
            block
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
