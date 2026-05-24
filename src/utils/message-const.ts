export const BAZAR_MESSAGES = {
  PAGE_TITLE: "Bazar Market",
  CREATE_BUTTON: "Create Bazar",
  FORM_TITLE_ADD: "Add New Bazar",
  FORM_TITLE_EDIT: "Edit Bazar",
  FORM_SUBMIT_ADD: "Submit",
  FORM_SUBMIT_UPDATE: "Update",
  REFRESH_SUCCESS: "Bazar data refreshed",
  CREATE_SUCCESS: "New Bazar added successfully",
  UPDATE_SUCCESS: "Bazar updated successfully",
  DELETE_SUCCESS: (name: string) => `${name} removed successfully`,
};

export const BAZAR_RESULT_MESSAGES = {
  PAGE_TITLE: "Bazar Result",
  CREATE_BUTTON: "Add Result",
  FORM_TITLE_ADD: "Add Bazar Result",
  FORM_TITLE_EDIT: "Edit Bazar Result",
  FORM_SUBMIT_ADD: "Submit",
  FORM_SUBMIT_UPDATE: "Update",
  REFRESH_SUCCESS: "Bazar result data refreshed",
  CREATE_SUCCESS: "Bazar result added successfully",
  UPDATE_SUCCESS: "Bazar result updated successfully",
  DELETE_SUCCESS: (name: string) => `Result for ${name} removed successfully`,
};

export const COMMON_MESSAGES = {
  REFRESH: "Data refreshed successfully",
  ERROR: "Something went wrong. Please try again.",
  LOGIN_SUCCESS: "Login success",
  LOGIN_ERROR: "Login failed",
  SIGNUP_SUCCESS:'Sign up success',
  SIGNUP_ERROR:'Sign up failed',
  LOGOUT_SUCCESS:'Logout success',
};

export const BANK_MESSAGES = {
  PAGE_TITLE: "Bank Details",
  CREATE_BUTTON: "Add Bank Details",
  FORM_TITLE_ADD: "Bank Details",
  FORM_TITLE_EDIT: "Edit Bank Details",
  FORM_SUBMIT_ADD: "Submit",
  FORM_SUBMIT_UPDATE: "Update",
  REFRESH_SUCCESS: "Bank details data refreshed",
  CREATE_SUCCESS: "Bank details added successfully",
  UPDATE_SUCCESS: "Bank details updated successfully",
  DELETE_SUCCESS: (name: string) => `Bank details for ${name} removed successfully`,
};

export const PASSWORD_MESSAGES = {
  PAGE_TITLE: "Change Password",
  CREATE_BUTTON: "Change Password",
  FORM_TITLE_ADD: "Change Password",
  FORM_TITLE_EDIT: "Change Password",
  FORM_SUBMIT_ADD: "Submit",
  FORM_SUBMIT_UPDATE: "Update",
  REFRESH_SUCCESS: "Password data refreshed",
  CREATE_SUCCESS: "Password added successfully",
  UPDATE_SUCCESS: "Password updated successfully",
  DELETE_SUCCESS: (name: string) => `Password for ${name} removed successfully`,
};

export const WITHDRAW_FUND_MESSAGES = {
  PAGE_TITLE: "Withdraw Fund",
  PAGE_SUBTITLE: "Send money to your bank account.",
  INFO_MESSAGE:
    "Withdrawal requests may take up to 24 hours.",
  INFO_DESCRIPTION:
    "Your funds will be credited to your bank account within 24 hours. Please rest assured that your money is always safe with us.",
  SUNDAY_NOTE: "Note: Sunday withdrawals are off",
  BANK_DETAILS_NOTE:
    "NOTE: Kindly update your bank details first. then you can withdraw amount",
  CONTACT_TEXT: "Unable to Withdraw Fund?",
  CONTACT_BUTTON: "Contact Admin",
};