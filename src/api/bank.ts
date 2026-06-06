import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";

export interface BankDetails {
  user_id: number;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
}

export interface UpdateBankRequest {
  user_id: number;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
}

export interface BankResponse {
  message: string;
  data: BankDetails;
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

export const updateBankDetails = async (
  data: UpdateBankRequest
): Promise<BankDetails> => {
  const response = await apiClient.post<BankResponse>("/bank/update", data);
  return response.data.data;
};

export const fetchBankDetails = async (userId: number): Promise<BankDetails | null> => {
  try {
    const response = await apiClient.get<BankResponse>(`/bank/${userId}`);
    return response.data.data || null;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
