// api/gameNumber.ts
import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";


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

export const getSiteSettings = async () => {
  const response = await apiClient.get("/settings");
  return response.data;
};

export const saveSiteSettings = async (data: {
  advertise1: string;
  advertise2: string;
  notice: string;
}) => {
  const response = await apiClient.post("/settings/save", data);
  return response.data;
};