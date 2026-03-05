// api/types.ts

// --- Bazar Types ---
export interface Bazar {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  openFormat: string;
  closeFormat: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddBazarRequest {
  "name": string
  "open_time":string,
  "close_time": string
  "format_open_time": string,
  "format_close_time": string
  "is_active":string
}

export interface AddBazarResponse {
  success: boolean;
  message: string;
  bazar: Bazar;
}

export interface UpdateBazarRequest {
  id: string;
  "name"?: string;
  "open_time"?: string;
  "close_time"?: string;
  "format_open_time"?: string;
  "format_close_time"?: string;
  "is_active"?: string;
}

export interface UpdateBazarResponse {
  success: boolean;
  message: string;
  bazar: Bazar;
}

export interface DeleteBazarRequest {
  id: string;
}

export interface DeleteBazarResponse {
  success: boolean;
  message: string;
}

// --- Auth Types (if reused) ---
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  mobile: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignUpResponse {
  token: string;
  user: {
    id: string;
    name: string;
    mobile: string;
  };
}