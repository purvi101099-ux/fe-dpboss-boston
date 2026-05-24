import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import CommonLabel from "@/components/common/CommonLabel";
import { changePasswordSchema } from "@/utils/validation";
import { PASSWORD_MESSAGES } from "@/utils/message-const"; // define similar to BANK_MESSAGES
import "@/styles/client-forms.css";

interface IDefaultValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const defaultValues: IDefaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
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
          <h1>{PASSWORD_MESSAGES.FORM_TITLE_ADD}</h1>
          <p>Update Your Profile Password</p>
        </div>

        <FormProvider {...methods}>
          <form
            className="client-form"
            onSubmit={handleSubmit(onInternalSubmit)}
          >
            <CommonLabel label="Old Password" required />
            <CommonInput
              name="oldPassword"
              placeholder="Existing Password"
              type="password"
            />

            <CommonLabel label="New Password" required />
            <CommonInput
              name="newPassword"
              placeholder="Enter New Password"
              type="password"
            />

            <CommonLabel label="Confirm Password" required />
            <CommonInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />

            <CommonButton
              label={PASSWORD_MESSAGES.FORM_SUBMIT_ADD}
              htmlType="submit"
              block
              className="client-submit-btn"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
