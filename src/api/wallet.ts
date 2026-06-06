import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";

export interface WalletData {
  user_id: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface WalletResponse {
  message: string;
  data: WalletData[];
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

export const fetchUserWallet = async (userId: number): Promise<WalletData> => {
  const response = await apiClient.get<WalletResponse>(
    `/userwallet/${userId}`
  );
  return response.data.data[0];
};

export interface TransactionRecord {
  txt_id: number;
  points: number;
  description: string;
  created_at: string;
  updated_at: string;
  type_id: number;
  wallet_type: string;
  market_id: number;
  market_name: string | null;
  status_id: number;
  status_name: string;
}

export interface TransactionHistoryResponse {
  data: TransactionRecord[];
  message?: string;
}

export const fetchWalletHistory = async (
  userId: number,
  type: string = "transaction"
): Promise<TransactionRecord[]> => {
  const response = await apiClient.get<TransactionHistoryResponse>(
    `/wallet-history/${userId}`,
    {
      params: {
        type,
      },
    }
  );
  return response.data.data;
};




