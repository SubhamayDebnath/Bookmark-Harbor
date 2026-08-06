import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import * as bookmarkApi from '@/api/bookmark.api';
import type {
  CreateBookmarkInput,
  UpdateBookmarkInput,
} from '@/validators/bookmark.validator';

interface ApiError {
  success: boolean;
  message: string;
}

interface GetBookmarksParams {
  page?: number;
  limit?: number;
  q?: string;
  filter?: 'all' | 'recent' | 'later';
}

export const useBookmark = () => {
  const [loading, setLoading] = useState(false);

  const createBookmark = async (payload: CreateBookmarkInput) => {
    setLoading(true);
    try {
      const res = await bookmarkApi.createBookmark(payload);
      toast.success(res.message || 'Bookmark created successfully.');
      return res.data.bookmark;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to create bookmark.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBookmarks = useCallback(
    async ({ page = 1, limit = 10, q, filter }: GetBookmarksParams = {}) => {
      setLoading(true);
      try {
        const res = await bookmarkApi.getBookmarks({
          page,
          limit,
          q,
          filter,
        });
        return res.data;
      } catch (error) {
        const err = error as AxiosError<ApiError>;
        toast.error(err.response?.data?.message ?? 'Unable to load bookmarks.');
        return {
          bookmarks: [],
          pagination: null,
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateBookmark = async (id: string, payload: UpdateBookmarkInput) => {
    setLoading(true);
    try {
      const res = await bookmarkApi.updateBookmark(id, payload);
      toast.success(res.message || 'Bookmark updated.');
      return res.data.bookmark;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to update bookmark.');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const deleteBookmark = async (id: string) => {
    setLoading(true);
    try {
      const res = await bookmarkApi.deleteBookmark(id);
      toast.success(res.message || 'Bookmark deleted.');
      return res;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message ?? 'Unable to delete bookmark.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark,
  };
};
