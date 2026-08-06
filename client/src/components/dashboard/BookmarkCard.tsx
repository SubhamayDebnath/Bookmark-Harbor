import { Badge } from '@/components/ui/badge';

function BookmarkCard() {
  return (
    <div className="bg-card border p-3">
      <h2 className="text-primary font-medium">Refactoring UI</h2>
      <span className="font-mono text-sm">refactoringui.com</span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge className="text-xs">Design</Badge>
      </div>
    </div>
  );
}

export default BookmarkCard;
