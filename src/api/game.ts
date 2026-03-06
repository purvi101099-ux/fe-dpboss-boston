// api/game.ts
import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";
import {
  AddBazarRequest,
  AddBazarResponse,
  UpdateBazarRequest,
  UpdateBazarResponse,
  DeleteBazarRequest,
  DeleteBazarResponse,
  Bazar,
} from "@/api/types";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add interceptor to attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBazar = async (): Promise<Bazar[]> => {
  const { data } = await api.get<Bazar[]>("/games");
  return data;
};

export const addBazar = async (
  credentials: AddBazarRequest
): Promise<AddBazarResponse> => {
  const { data } = await api.post<AddBazarResponse>("/games/create", credentials);
  return data;
};

export const updateBazar = async (
  payload: UpdateBazarRequest
): Promise<UpdateBazarResponse> => {
  const { id, ...dataToSend } = payload;
  const { data } = await api.put<UpdateBazarResponse>(`/games/update/${id}`, dataToSend);
  return data;
};

export const deleteBazar = async (
  payload: DeleteBazarRequest
): Promise<DeleteBazarResponse> => {
  const { data } = await api.delete<DeleteBazarResponse>(`/games/delete/${payload.id}`);
  return data;
};