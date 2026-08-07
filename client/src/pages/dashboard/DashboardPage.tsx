import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import AppPagination from '@/components/common/AppPagination';
import LoadingScreen from '@/components/common/LoadingScreen';
import BookmarkCard from '@/components/dashboard/BookmarkCard';
import AddBookmark from '@/components/dashboard/AddBookmark';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBookmark } from '@/hooks/useBookmark';
import { useRefreshStore } from '@/store/refresh.store';
import type { Bookmark, Pagination } from '@/types/bookmark.types';

const LIMIT = 10;
const SEARCH_DEBOUNCE_MS = 300;

const sortItems = [
  { label: 'All', value: 'all' },
  { label: 'Recent', value: 'recent' },
  { label: 'Later', value: 'later' },
];

function DashboardPage() {
  const { getBookmarks } = useBookmark();
  const { refreshCount } = useRefreshStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const q = searchParams.get('q') || '';
  const filter = searchParams.get('filter') || 'all';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  useEffect(() => {
    const loadBookmarks = async () => {
      const { bookmarks, pagination } = await getBookmarks({
        page,
        limit: LIMIT,
        q,
        filter: filter as 'all' | 'recent' | 'later',
      });
      setBookmarks(bookmarks);
      setPagination(pagination);
      setInitialLoading(false);
    };
    loadBookmarks();
  }, [page, q, filter, refreshCount, getBookmarks]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== q) {
        updateParam('q', searchInput);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <>
      <Helmet>
        <title>My Bookmarks — Bookmark Harbor</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="flex w-full flex-col gap-5 py-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="w-full">
            <Input
              placeholder="Search...."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            <Select
              value={filter}
              onValueChange={(value) => updateParam('filter', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <AddBookmark />
          </div>
        </div>

        <h1 className="text-primary text-lg font-medium tracking-tight">
          Bookmarks
        </h1>

        {initialLoading ? (
          <LoadingScreen />
        ) : bookmarks.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 px-5 py-20">
            <p className="text-center">Bookmark not found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark._id} bookmark={bookmark} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div>
                <AppPagination pagination={pagination} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default DashboardPage;
