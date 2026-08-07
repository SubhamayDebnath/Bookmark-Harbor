import { Link } from 'react-router';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UpdateBookmark from '@/components/dashboard/UpdateBookmark';
import DeleteBookmark from '@/components/dashboard/DeleteBookmark';
import type { Bookmark } from '@/types/bookmark.types';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const hostname = (() => {
    try {
      return new URL(bookmark.url).hostname;
    } catch {
      return bookmark.url;
    }
  })();

  return (
    <div className="bg-card rounded-lg border p-3">
      <h2 className="text-primary font-medium">{bookmark.title}</h2>
      <span className="font-mono text-sm">{hostname}</span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button variant={'outline'} size={'icon-sm'} asChild>
          <Link to={bookmark.url} target="_blank" rel="noopener noreferrer">
            <Globe />
          </Link>
        </Button>
        <UpdateBookmark bookmark={bookmark} />
        <DeleteBookmark bookmarkId={bookmark._id} title={bookmark.title} />
      </div>
    </div>
  );
}

export default BookmarkCard;
