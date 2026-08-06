import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

function NotFound() {
  return (
    <section className="flex h-full min-h-dvh w-full max-w-4xl flex-col items-center justify-center gap-3 p-5">
      <h1 className="text-primary text-4xl font-bold tracking-tight">
        Error 404
      </h1>
      <p className="text-center">
        The page you're looking for doesn't exist, or may have been moved.
      </p>
      <Button variant={'outline'} size={'lg'} asChild>
        <Link to={'/'}>Back to home</Link>
      </Button>
    </section>
  );
}

export default NotFound;
