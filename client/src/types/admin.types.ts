import type { Pagination } from '@/types/bookmark.types';

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: Pagination;
  };
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
    stats: {
      bookmarkCount: number;
    };
  };
}

export interface StatsResponse {
  success: boolean;
  message: string;
  data: {
    users: {
      total: number;
      active: number;
      inactive: number;
      admins: number;
    };
    bookmarks: {
      total: number;
    };
    mongo: {
      db: string;
      collections: number;
      objects: number;
      avgObjSize: number;
      dataSize: number;
      storageSize: number;
      indexes: number;
      indexSize: number;
    } | null;
    server: {
      uptimeSeconds: number;
      nodeVersion: string;
      platform: string;
      arch: string;
      memory: {
        rss: number;
        heapTotal: number;
        heapUsed: number;
        external: number;
      };
      cpuCount: number;
      loadAverage: number[];
      totalSystemMemory: number;
      freeSystemMemory: number;
    };
  };
}
