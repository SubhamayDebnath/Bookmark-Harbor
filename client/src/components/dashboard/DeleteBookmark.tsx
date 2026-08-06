import { Trash } from 'lucide-react';
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

function DeleteBookmark() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon-xs"
          aria-label="Delete Bookmark"
        >
          <Trash />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBookmark;
