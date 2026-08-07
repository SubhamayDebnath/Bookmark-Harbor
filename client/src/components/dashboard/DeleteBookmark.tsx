import { useState } from 'react';
import { LoaderCircle, Trash } from 'lucide-react';
import { useBookmark } from '@/hooks/useBookmark';
import { useRefreshStore } from '@/store/refresh.store';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteBookmarkProps {
  bookmarkId: string;
  title: string;
}

function DeleteBookmark({ bookmarkId, title }: DeleteBookmarkProps) {
  const { deleteBookmark, loading } = useBookmark();
  const { appRefresh } = useRefreshStore();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteBookmark(bookmarkId);
    appRefresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon-sm"
          aria-label="Delete Bookmark"
        >
          <Trash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{title}</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBookmark;
