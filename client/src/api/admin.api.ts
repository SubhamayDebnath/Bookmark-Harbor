import { api } from '@/api/axios';
import type {
  UserListResponse,
  UserDetailsResponse,
  StatsResponse,
} from '@/types/admin.types';

interface GetUsersParams {
  page?: number;
  limit?: number;
  q?: string;
  role?: string;
  isActive?: boolean;
}

export const getUsers = async ({
  page = 1,
  limit = 10,
  q,
  role,
  isActive,
}: GetUsersParams = {}) => {
  const { data } = await api.get<UserListResponse>('/admin/users', {
    params: {
      page,
      limit,
      q,
      role,
      isActive,
    },
  });

  return data;
};

export const getUser = async (id: string) => {
  const { data } = await api.get<UserDetailsResponse>(`/admin/users/${id}`);
  return data;
};

export const getStats = async () => {
  const { data } = await api.get<StatsResponse>('/admin/stats');
  return data;
};

export const updateUserRole = async (id: string) => {
  const { data } = await api.patch<UserDetailsResponse>(
    `/admin/users/${id}/role`,
  );
  return data;
};

export const toggleUserActive = async (id: string) => {
  const { data } = await api.patch<UserDetailsResponse>(
    `/admin/users/${id}/active`,
  );
  return data;
};
