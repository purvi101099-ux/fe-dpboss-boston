// api/auth.ts
import axios from "axios";
import { LoginRequest, SignupRequest, LoginResponse, SignUpResponse } from "@/api/types";
import { API_URL } from "@/utils/constants";

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(`${API_URL}/users/login`, credentials);
  return data;
};

export const signupUser = async (userInfo: SignupRequest): Promise<SignUpResponse> => {
  const { data } = await axios.post<SignUpResponse>(`${API_URL}/users/register`, userInfo);
  return data;
};