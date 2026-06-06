import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CommonButton from "@/components/common/commonButton";
import CommonInput from "@/components/common/commonInput";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/utils/validation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";
import { message } from "antd";
import { COMMON_MESSAGES } from "@/utils/message-const";
import { TOKEN } from "@/utils/constants";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (credentials: any) => loginUser(credentials),
    onSuccess: (data: any) => {
      localStorage.setItem(TOKEN, data?.token);
      message.success(COMMON_MESSAGES.LOGIN_SUCCESS);
      navigate("/admin/dashboard");
    },
    onError: (error: any) => {
      message.error(error.response.data.message || COMMON_MESSAGES.LOGIN_ERROR);
    },
  });

  const methods = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: any) => {
    const payload = {
      mobile: data.mobile,
      password: data.password,
    };
    mutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="auth-wrapper">
          <div className="auth-right">
            <div className="auth-card">
              <div className="auth-logo">
                <img src="logo.png" alt="Logo" />
              </div> 
 
              <h2 className="auth-title">Welcome</h2>
              <p className="auth-subtitle">Sign In to your account</p>
              <div className="form-group">
                <label className="form-label">
                  Mobile No <span>*</span>
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
                label="LOGIN"
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
