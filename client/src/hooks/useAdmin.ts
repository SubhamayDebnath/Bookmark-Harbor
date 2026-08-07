import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import * as adminApi from '@/api/admin.api';

interface ApiError {
  success: boolean;
  message: string;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  q?: string;
  role?: string;
  isActive?: boolean;
}

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async (params: GetUsersParams = {}) => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers(params);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to load users.');
      return {
        users: [],
        pagination: null,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await adminApi.getUser(id);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to load user.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getStats();
      return res.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to load stats.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserRole = async (id: string) => {
    setLoading(true);
    try {
      const res = await adminApi.updateUserRole(id);
      toast.success(res.message);
      return res.data.user;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to update role.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleUserActive = async (id: string) => {
    setLoading(true);
    try {
      const res = await adminApi.toggleUserActive(id);
      toast.success(res.message);
      return res.data.user;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to update status.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getUsers,
    getUser,
    getStats,
    updateUserRole,
    toggleUserActive,
  };
};
