import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CommonButton from "@/components/common/commonButton";
import CommonInput from "@/components/common/commonInput";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/utils/validation";
import { useMutation } from "@tanstack/react-query";
import { COMMON_MESSAGES } from "@/utils/message-const";
import { message } from "antd";
import { signupUser } from "@/api/auth";

const SignUp: React.FC = () => {
  const mutation = useMutation({
    mutationFn: (credentials: any) => signupUser(credentials),
    onSuccess: () => {
      message.success(COMMON_MESSAGES.SIGNUP_SUCCESS);
      navigate("/sign-in");
    },
    onError: (error: any) => {
      message.error(
        error.response.data.message || COMMON_MESSAGES.SIGNUP_ERROR,
      );
    },
  });
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: any) => {
    const payload = {
      name: data.username,
      mobile: data.mobile,
      password: data.password,
    };
    mutation.mutate(payload);
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
              <p className="auth-subtitle">Welcome to Satta8055 international</p>

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
                <CommonInput name="mobile" placeholder="Enter mobile number" />
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
