export interface Bookmark {
  _id: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BookmarkResponse {
  success: boolean;
  message: string;
  data: {
    bookmark: Bookmark;
  };
}

export interface BookmarkListResponse {
  success: boolean;
  message: string;
  data: {
    bookmarks: Bookmark[];
    pagination: Pagination;
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
