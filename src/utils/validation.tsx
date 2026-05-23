import * as yup from "yup";

/* ------------------ Sign In Schema ------------------ */
export const signInSchema = yup.object({
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

/* ------------------ Sign Up Schema ------------------ */
export const signUpSchema = yup.object({
  username: yup.string().required("Username is required"),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

/* ------------------ Bazar Schema ------------------ */
export const bazarSchema = yup.object().shape({
  name: yup.string().required("Bazar name is required"),
  open_time: yup.string().required("Open time is required"),
  close_time: yup.string().required("Close time is required"),
  format_open_time: yup.string().required("Open format is required"),
  format_close_time: yup.string().required("Close format is required"),
  is_active: yup.string().required("Status is required"),
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

/* ------------------ Bank Details Schema ------------------ */
export const bankDetailsSchema = yup.object().shape({
  beneficiaryName: yup.string().required("Beneficiary name is required"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .matches(/^[0-9]{9,18}$/, "Enter a valid account number"),
  ifscCode: yup
    .string()
    .required("IFSC code is required")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code"),
  bankName: yup.string().required("Bank name is required"),
});
