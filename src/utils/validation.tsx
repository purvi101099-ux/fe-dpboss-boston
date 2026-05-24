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
  openNumber: yup
    .string()
    .required("Open number is required")
    .matches(/^[0-9]{1,3}$/, "Open number must be 1-3 digits (0-999)")
    .typeError("Open number must be a number"),
  closeNumber: yup
    .string()
    .optional(),
  jodiNumber: yup
    .string()
    .required("Jodi number is required")
    .matches(/^[0-9]{1,2}$/, "Jodi number must be 1-2 digits (0-99)")
    .typeError("Jodi number must be a number"),
  date: yup.mixed().required("Date is required"),
  isLucky: yup.string().required("Lucky status is required"),
});
