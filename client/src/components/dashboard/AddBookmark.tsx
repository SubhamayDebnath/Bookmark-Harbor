import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useBookmark } from '@/hooks/useBookmark';
import { useRefreshStore } from '@/store/refresh.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  createBookmarkSchema,
  type CreateBookmarkInput,
} from '@/validators/bookmark.validator';

function AddBookmark() {
  const { createBookmark, loading } = useBookmark();
  const { appRefresh } = useRefreshStore();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<CreateBookmarkInput>({
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const onSubmit = async (values: CreateBookmarkInput) => {
    const result = createBookmarkSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await createBookmark(values);
    appRefresh();
    reset({
      title: '',
      url: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Bookmark</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Bookmark</DialogTitle>
          <DialogDescription>
            Save a bookmark to access it anytime.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="OpenAI"
              autoComplete="off"
              {...register('title')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://openai.com"
              autoComplete="off"
              {...register('url')}
            />
          </div>
          <div className="mt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Bookmark'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBookmark;
