// api/gameNumber.ts
import axios from "axios";
import { API_URL, TOKEN } from "@/utils/constants";
import {
  AddGameNumberRequest,
  UpdateGameNumberRequest,
  GameNumberResponse,
  GameNumberListParams,
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

/**
 * Add new game number record
 */
export const addGameNumber = async (
  payload: AddGameNumberRequest
): Promise<GameNumberResponse> => {
  const { data } = await api.post<GameNumberResponse>("/game-numbers", payload);
  return data;
};

/**
 * Update existing game number record
 */
export const updateGameNumber = async (
  payload: UpdateGameNumberRequest
): Promise<GameNumberResponse> => {
  const { data } = await api.post<GameNumberResponse>("/game-numbers", payload);
  return data;
};

/**
 * Get game numbers with filter (all or live)
 */
export const getGameNumbers = async (
  params: GameNumberListParams
): Promise<GameNumberResponse> => {
  const { data } = await api.get<GameNumberResponse>("/game-numbers", { params });
  return data;
};

/**
 * Get game numbers for a specific game ID
 */
export const getGameNumbersByGameId = async (
  gameId: number,
  params: Omit<GameNumberListParams, "type">
): Promise<GameNumberResponse> => {
  const { data } = await api.get<GameNumberResponse>(`/game-numbers/game/${gameId}`, {
    params,
  });
  return data;
};
