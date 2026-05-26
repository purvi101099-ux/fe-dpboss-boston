import { GameType } from "@/pages/client-side/my-bids/types";
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

/* ------------------ Change Password Schema ------------------ */
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

/* ------------------ Add Fund Schema ------------------ */
export const addFundSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Enter a valid amount")
    .min(10, "Minimum amount is 10"),
  paymentMethod: yup.string().required("Payment method is required"),
});

export const biddingSchema = yup.object({
  gameType: yup
    .string()
    .required("Game type is required")
    .oneOf(Object.values(GameType)),

  ankSub: yup.string().nullable(),

  jodiSub: yup.string().nullable(),

  panaSub: yup.string().nullable(),

  digits: yup
    .string()
    .required("Digits are required")
    .test(
      "digits-validation",
      "Invalid digits for selected game type",
      function (value) {
        const { gameType } = this.parent;

        if (!value) return false;

        switch (gameType) {
          case GameType.ANK:
            return /^[0-9]{1}$/.test(value);

          case GameType.JODI:
            return /^[0-9]{2}$/.test(value);

          case GameType.PANA:
            return /^[0-9]{3}$/.test(value);

          default:
            return false;
        }
      },
    ),

  points: yup.string().required("Points are required"),
});

export type BiddingFormSchema = yup.InferType<typeof biddingSchema>;
