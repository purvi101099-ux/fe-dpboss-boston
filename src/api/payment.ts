import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";

export interface PaymentDetails {
  user_id: number;
  google_pay_number: string;
  phone_pe_number: string;
  paytm_number: string;
  upi_id: string;
}

export interface UpdatePaymentRequest {
  user_id: number;
  google_pay_number: string | null;
  phone_pe_number: string | null;
  paytm_number: string | null;
  upi_id: string | null;
}

export interface PaymentResponse {
  message: string;
  data: PaymentDetails;
}

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add interceptor to attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const updatePaymentDetails = async (
  data: UpdatePaymentRequest
): Promise<PaymentDetails> => {
  const response = await apiClient.post<PaymentResponse>("/upi/update", data);
  return response.data.data;
};

export const fetchPaymentDetails = async (userId: number): Promise<PaymentDetails | null> => {
  try {
    const response = await apiClient.get<PaymentResponse>(`/upi/${userId}`);
    return response.data.data || null;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
