import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CommonButton from "@/components/common/commonButton";
import CommonInput from "@/components/common/commonInput";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/utils/validation";

const SignUp: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = (data: any) => {
    console.log("Signup Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="auth-wrapper">
          {/* RIGHT SIDE FORM */}
          <div className="auth-right">
            <div className="auth-card">
              <div className="auth-logo">
                <img src="src/assets/logoApp.png" alt="Logo" />
              </div>

              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Welcome to dpboss international</p>

              <div className="form-group">
                <label className="form-label">
                  Username <span>*</span>
                </label>
                <CommonInput name="username" placeholder="Enter username" />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Mobile Number <span>*</span>
                </label>
                <CommonInput
                  name="mobileNo"
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password <span>*</span>
                </label>
                <CommonInput
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>

              <CommonButton
                label="Create Account"
                htmlType="submit"
                className="auth-btn"
                block
              />

              <div className="auth-footer">
                Already have an account? <Link to="/sign-in">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignUp;
