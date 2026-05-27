import { GameType } from "@/pages/client-side/my-bids/types";
import * as yup from "yup";

/* ------------------ REGEX ------------------ */

export const REGEX = {
  MOBILE: /^[0-9]{10}$/,
  ACCOUNT_NUMBER: /^[0-9]{9,18}$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  OPEN_NUMBER: /^[0-9]{1,3}$/,
  JODI_NUMBER: /^[0-9]{1,2}$/,
  ANK_DIGIT: /^[0-9]{1}$/,
  JODI_DIGIT: /^[0-9]{2}$/,
  PANA_DIGIT: /^[0-9]{3}$/,
  UPI_ID: /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/,
};

/* ------------------ VALIDATION MESSAGES ------------------ */

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,

  INVALID_MOBILE: (field: string) =>
    `Enter valid ${field} (Example: 9876543210)`,

  INVALID_ACCOUNT_NUMBER: (field: string) =>
    `Enter valid ${field} (Example: 123456789012)`,

  INVALID_IFSC: (field: string) =>
    `Enter valid ${field} (Example: HDFC0001234)`,

  INVALID_UPI: (field: string) => `Enter valid ${field} (Example: test@paytm)`,

  INVALID_OPEN_NUMBER: (field: string) =>
    `${field} must be 1-3 digits (Example: 123)`,

  INVALID_JODI_NUMBER: (field: string) =>
    `${field} must be 1-2 digits (Example: 12)`,

  PASSWORD_MIN: "Password must be at least 6 characters",

  MIN_6_CHAR: "Minimum 6 characters",

  PASSWORD_MATCH: "Passwords must match",

  INVALID_AMOUNT: "Enter valid amount (Example: 500)",

  MIN_AMOUNT: "Minimum amount is 10",

  INVALID_DIGITS: "Invalid digits for selected game type",
};

/* ------------------ Sign In Schema ------------------ */

export const signInSchema = yup.object({
  mobile: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Mobile number"))
    .matches(REGEX.MOBILE, VALIDATION_MESSAGES.INVALID_MOBILE("mobile number")),

  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Password"))
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
});

/* ------------------ Sign Up Schema ------------------ */

export const signUpSchema = yup.object({
  username: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Username")),

  mobile: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Mobile number"))
    .matches(REGEX.MOBILE, VALIDATION_MESSAGES.INVALID_MOBILE("mobile number")),

  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Password"))
    .min(6, VALIDATION_MESSAGES.MIN_6_CHAR),
});

/* ------------------ Bazar Schema ------------------ */

export const bazarSchema = yup.object().shape({
  name: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Bazar name")),

  open_time: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Open time")),

  close_time: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Close time")),

  format_open_time: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Open format")),

  format_close_time: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Close format")),

  is_active: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Status")),
});

/* ------------------ Bazar Result Schema ------------------ */

export const bazarResultSchema = yup.object().shape({
  name: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Bazar name")),

  openNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Open number"))
    .matches(
      REGEX.OPEN_NUMBER,
      VALIDATION_MESSAGES.INVALID_OPEN_NUMBER("Open number"),
    )
    .typeError("Open number must be a number"),

  closeNumber: yup.string().optional(),

  jodiNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Jodi number"))
    .matches(
      REGEX.JODI_NUMBER,
      VALIDATION_MESSAGES.INVALID_JODI_NUMBER("Jodi number"),
    )
    .typeError("Jodi number must be a number"),

  date: yup.mixed().required(VALIDATION_MESSAGES.REQUIRED("Date")),

  isLucky: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Lucky status")),
});

/* ------------------ Bank Details Schema ------------------ */

export const bankDetailsSchema = yup.object().shape({
  beneficiaryName: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Beneficiary name")),

  accountNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Account number"))
    .matches(
      REGEX.ACCOUNT_NUMBER,
      VALIDATION_MESSAGES.INVALID_ACCOUNT_NUMBER("account number"),
    ),

  ifscCode: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("IFSC code"))
    .matches(REGEX.IFSC, VALIDATION_MESSAGES.INVALID_IFSC("IFSC code")),

  bankName: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Bank name")),
});

/* ------------------ Change Password Schema ------------------ */

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Old password")),

  newPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("New password"))
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),

  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Confirm password"))
    .oneOf([yup.ref("newPassword")], VALIDATION_MESSAGES.PASSWORD_MATCH),
});

/* ------------------ Add Fund Schema ------------------ */

export const addFundSchema = yup.object().shape({
  amount: yup
    .number()
    .required(VALIDATION_MESSAGES.REQUIRED("Amount"))
    .typeError(VALIDATION_MESSAGES.INVALID_AMOUNT)
    .min(10, VALIDATION_MESSAGES.MIN_AMOUNT),

  paymentMethod: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Payment method")),
});

/* ------------------ Bidding Schema ------------------ */

export const biddingSchema = yup.object({
  gameType: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Game type"))
    .oneOf(Object.values(GameType)),

  ankSub: yup.string().nullable(),

  jodiSub: yup.string().nullable(),

  panaSub: yup.string().nullable(),

  digits: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Digits"))
    .test(
      "digits-validation",
      VALIDATION_MESSAGES.INVALID_DIGITS,
      function (value) {
        const { gameType } = this.parent;

        if (!value) return false;

        switch (gameType) {
          case GameType.ANK:
            return REGEX.ANK_DIGIT.test(value);

          case GameType.JODI:
            return REGEX.JODI_DIGIT.test(value);

          case GameType.PANA:
            return REGEX.PANA_DIGIT.test(value);

          default:
            return false;
        }
      },
    ),

  points: yup.string().required(VALIDATION_MESSAGES.REQUIRED("Points")),
});

/* ------------------ Payment Details Schema ------------------ */

export const paymentDetailsSchema = yup.object().shape({
  gpayNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("GPay number"))
    .matches(REGEX.MOBILE, VALIDATION_MESSAGES.INVALID_MOBILE("GPay number")),

  phonePeNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("PhonePe number"))
    .matches(
      REGEX.MOBILE,
      VALIDATION_MESSAGES.INVALID_MOBILE("PhonePe number"),
    ),

  paytmNumber: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("Paytm number"))
    .matches(REGEX.MOBILE, VALIDATION_MESSAGES.INVALID_MOBILE("Paytm number")),

  upiId: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED("UPI ID"))
    .matches(REGEX.UPI_ID, VALIDATION_MESSAGES.INVALID_UPI("UPI ID")),
});

/* ------------------ Types ------------------ */

export type BiddingFormSchema = yup.InferType<typeof biddingSchema>;
