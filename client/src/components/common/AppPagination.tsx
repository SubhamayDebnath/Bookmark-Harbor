import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router';
import type { Pagination as PaginationType } from '@/types/bookmark.types';

interface AppPaginationProps {
  pagination: PaginationType;
}

function AppPagination({ pagination }: AppPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
  };

  const pages: (number | string)[] = [];

  for (let i = 1; i <= pagination.totalPages; i++) {
    if (
      i === 1 ||
      i === pagination.totalPages ||
      Math.abs(i - pagination.page) <= 1
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.hasPrev) {
                changePage(pagination.page - 1);
              }
            }}
            className={
              !pagination.hasPrev ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === '...' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={pagination.page === page}
                onClick={(e) => {
                  e.preventDefault();
                  changePage(page as number);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (pagination.hasNext) {
                changePage(pagination.page + 1);
              }
            }}
            className={
              !pagination.hasNext ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagination;
