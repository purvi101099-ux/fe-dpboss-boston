// types/auth.ts
export interface LoginRequest {
  mobile: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  mobile: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}