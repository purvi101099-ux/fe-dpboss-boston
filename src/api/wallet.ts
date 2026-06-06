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




