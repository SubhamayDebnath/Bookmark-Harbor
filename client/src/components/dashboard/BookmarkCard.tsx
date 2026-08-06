import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import { Globe } from 'lucide-react';
import UpdateBookmark from '@/components/dashboard/UpdateBookmark';
import DeleteBookmark from '@/components/dashboard/DeleteBookmark';

function BookmarkCard() {
  return (
    <div className="bg-card border p-3">
      <h2 className="text-primary font-medium">Refactoring UI</h2>
      <span className="font-mono text-sm">refactoringui.com</span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge className="text-xs h-6">Design</Badge>
        <Button variant={'outline'} size={"icon-xs"} asChild>
          <Link to={"/"}>
          <Globe/>
          </Link>
        </Button>
        <UpdateBookmark/>
        <DeleteBookmark/>
      </div>
    </div>
  );
}

export default BookmarkCard;
