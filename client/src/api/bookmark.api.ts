import { api } from '@/api/axios';
import type {
  BookmarkListResponse,
  BookmarkResponse,
} from '@/types/bookmark.types';
import type {
  CreateBookmarkInput,
  UpdateBookmarkInput,
} from '@/validators/bookmark.validator';

interface GetBookmarksParams {
  page?: number;
  limit?: number;
  q?: string;
  filter?: 'all' | 'recent' | 'later';
}

export const createBookmark = async (payload: CreateBookmarkInput) => {
  const { data } = await api.post<BookmarkResponse>('/bookmark', payload);
  return data;
};

export const getBookmarks = async ({
  page = 1,
  limit = 10,
  q,
  filter,
}: GetBookmarksParams = {}) => {
  const { data } = await api.get<BookmarkListResponse>('/bookmark', {
    params: {
      page,
      limit,
      q,
      filter,
    },
  });

  return data;
};

export const updateBookmark = async (
  id: string,
  payload: UpdateBookmarkInput,
) => {
  const { data } = await api.patch<BookmarkResponse>(
    `/bookmark/${id}`,
    payload,
  );
  return data;
};

export const deleteBookmark = async (id: string) => {
  const { data } = await api.delete<BookmarkResponse>(`/bookmark/${id}`);
  return data;
};
