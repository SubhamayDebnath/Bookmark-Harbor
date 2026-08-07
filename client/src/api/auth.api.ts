import { api } from '@/api/axios';
import type { AuthResponse, ApiResponse } from '@/types/auth.types';
import type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '@/validators/auth.validator';

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const register = async (payload: RegisterInput) => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginInput) => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<ApiResponse>('/auth/logout');
  return data;
};

export const forgotPassword = async (payload: ForgotPasswordInput) => {
  const { data } = await api.post<ApiResponse>(
    '/auth/forgot-password',
    payload,
  );
  return data;
};

export const resetPassword = async (payload: ResetPasswordInput) => {
  const { data } = await api.post<ApiResponse>('/auth/reset-password', payload);
  return data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.post<ApiResponse>(
    '/auth/change-password',
    payload,
  );
  return data;
};

export const me = async () => {
  const { data } = await api.get<AuthResponse>('/auth/me');
  return data;
};
