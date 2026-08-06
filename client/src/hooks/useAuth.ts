import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useCallback } from 'react';
import * as authApi from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

interface ApiError {
  success: boolean;
  message: string;
}

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useAuthStore();

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.register({ name, email, password });
      setUser(res.data);
      toast.success(
        res.message || 'Your account has been created successfully.',
      );
      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        err.response?.data?.message ??
          'Unable to create your account. Please try again.',
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setUser(res.data);
      toast.success(res.message || `Welcome back, ${res.data.name}!`);
      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        err.response?.data?.message ??
          'Unable to sign in. Please check your email and password.',
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await authApi.logout();
      setUser(null);
      toast.success(res.message || 'You have been logged out successfully.');
      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(
        err.response?.data?.message ?? 'Unable to log out. Please try again.',
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = useCallback(async () => {
    try {
      const res = await authApi.me();
      setUser(res.data);
      return res.data;
    } catch {
      setUser(null);
      return null;
    }
  }, [setUser]);

  return {
    user,
    loading,
    register,
    login,
    logout,
    getCurrentUser,
  };
};
