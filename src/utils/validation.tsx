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

/* ------------------ Bazar Schema ------------------ */
export const bazarSchema = yup.object().shape({
  name: yup.string().required("Bazar name is required"),
  openTime: yup.mixed().required("Open time is required"),
  closeTime: yup.mixed().required("Close time is required"),
  openFormat: yup.string().required("Open format is required"),
  closeFormat: yup.string().required("Close format is required"),
  status: yup.string().required("Status is required"),
});

/* ------------------ Bazar Result Schema ------------------ */
export const bazarResultSchema = yup.object().shape({
  name: yup.string().required("Bazar name is required"),
  openNumber: yup.string().required("Open number is required"),
  closeNumber: yup.string().required("Close number is required"),
  jodiNumber: yup.string().required("Jodi number is required"),
  date: yup.mixed().required("Date is required"),
  isLucky: yup.string().required("Lucky status is required"),
});
