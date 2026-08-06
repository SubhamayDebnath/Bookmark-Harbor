import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2Icon } from 'lucide-react';
const sortItems = [
  { label: 'All', value: 'all' },
  { label: 'Recent', value: 'recent' },
  { label: 'Later', value: 'later' },
];

function UpdateBookmark() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={"icon-xs"} aria-label="Update Bookmark">
          <Edit2Icon/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Bookmark</DialogTitle>
          <DialogDescription>Update your bookmark details.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input placeholder="Localhost" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Website URL</Label>
            <Input placeholder="http://localhost:5173/" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select Color</Label>
            <Select>
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
          </div>
          <div>
            <Button className="w-full">Save Bookmark</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBookmark;
