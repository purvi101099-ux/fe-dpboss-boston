import * as yup from "yup";

/* ------------------ Sign In Schema ------------------ */
export const signInSchema = yup.object({
  username: yup.string().required("Username is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

/* ------------------ Sign Up Schema ------------------ */
export const signUpSchema = yup.object({
  username: yup.string().required("Username is required"),

  mobileNo: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
