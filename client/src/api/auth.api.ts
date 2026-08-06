import { api } from '@/api/axios';
import type { AuthResponse, ApiResponse } from '@/types/auth.types';
import type { LoginInput, RegisterInput } from '@/validators/auth.validator';

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

export const me = async () => {
  const { data } = await api.get<AuthResponse>('/auth/me');
  return data;
};
