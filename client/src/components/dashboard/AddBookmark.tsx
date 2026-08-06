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
const sortItems = [
  { label: 'All', value: 'all' },
  { label: 'Recent', value: 'recent' },
  { label: 'Later', value: 'later' },
];

function AddBookmark() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Bookmark</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Save a bookmark to access it anytime.
          </DialogDescription>
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
            <Button className="w-full">Create Bookmark</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBookmark;
