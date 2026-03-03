import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CommonButton from "@/components/common/commonButton";
import CommonInput from "@/components/common/commonInput";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/validation";

const SignIn: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Signin Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="auth-wrapper">
          <div className="auth-right">
            <div className="auth-card">
              <div className="auth-logo">
                <img src="src/assets/logoApp.png" alt="Logo" />
              </div>

              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Login to manage your CRM</p>
              <div className="form-group">
                <label className="form-label">
                  Username <span>*</span>
                </label>
                <CommonInput name="username" placeholder="Enter username" />
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
                label="Sign In"
                htmlType="submit"
                className="auth-btn"
                block
              />

              <div className="auth-footer">
                Don’t have an account? <Link to="/sign-up">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignIn;
