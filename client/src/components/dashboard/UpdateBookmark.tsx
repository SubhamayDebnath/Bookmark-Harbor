import { useEffect, useState } from 'react';
import { Edit2Icon, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useBookmark } from '@/hooks/useBookmark';
import { useRefreshStore } from '@/store/refresh.store';
import type { Bookmark } from '@/types/bookmark.types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  updateBookmarkSchema,
  type UpdateBookmarkInput,
} from '@/validators/bookmark.validator';

interface UpdateBookmarkProps {
  bookmark: Bookmark;
}

function UpdateBookmark({ bookmark }: UpdateBookmarkProps) {
  const { updateBookmark, loading } = useBookmark();
  const { appRefresh } = useRefreshStore();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<UpdateBookmarkInput>({
    defaultValues: {
      title: bookmark.title,
      url: bookmark.url,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: bookmark.title,
        url: bookmark.url,
      });
    }
  }, [open, bookmark, reset]);

  const onSubmit = async (values: UpdateBookmarkInput) => {
    const result = updateBookmarkSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await updateBookmark(bookmark._id, values);
    appRefresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon-xs'}
          aria-label="Update Bookmark"
        >
          <Edit2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Bookmark</DialogTitle>
          <DialogDescription>Update your bookmark details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Localhost"
              autoComplete="off"
              {...register('title')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Website URL</Label>
            <Input
              placeholder="http://localhost:5173/"
              autoComplete="off"
              {...register('url')}
            />
          </div>
          <div className="mt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Bookmark'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBookmark;
