import { ApiResponse, User } from "@/types";
import apiClient from "../axios";
// import { ApiResponse, User } from "@/src/types";
import { LoginFormValues, RegisterFormValues } from "../validations/auth.schema";

interface AuthResponse {
  user: User;
  token: string;
}

export const registerUser = async (data: RegisterFormValues) => {
  const res = await apiClient.post<ApiResponse<AuthResponse>>(
    "/api/auth/register",
    data,
  );
  return res.data.data;
};

export const loginUser = async (data: LoginFormValues) => {
  const res = await apiClient.post<ApiResponse<AuthResponse>>(
    "/api/auth/login",
    data,
  );
  return res.data.data;
};

export const getCurrentUser = async () => {
  const res = await apiClient.get<ApiResponse<User>>("/api/auth/me");
  return res.data.data;
};
