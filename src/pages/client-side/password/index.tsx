import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/utils/validation";
import CommonInput from "@/components/common/commonInput";
import CommonButton from "@/components/common/commonButton";
import "@/styles/client-forms.css";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Password: React.FC = () => {
  const methods = useForm<ChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordForm) => {
    console.log("Password Change Submitted:", data);
  };

  return (
    <div className="client-form-page">
      <div className="client-form-card">
        <div className="client-form-header">
          <h1>Change Password</h1>
          <p>Update Your Profile Password</p>
        </div>

        <FormProvider {...methods}>
          <form
            className="client-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label className="form-label">Old Password:</label>
              <CommonInput
                name="oldPassword"
                placeholder="Existing Password"
                type="password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password:</label>
              <CommonInput
                name="newPassword"
                placeholder="Enter New Password"
                type="password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password:</label>
              <CommonInput
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
            </div>

            <CommonButton
              label="Submit"
              htmlType="submit"
              block
              className="client-submit-btn"
              style={{ marginTop: "10px" }}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Password;
