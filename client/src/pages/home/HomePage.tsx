import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 py-10">
      <span className="font-mono text-sm font-medium uppercase">
        [ your reading shelf, in order ]
      </span>
      <h1 className="text-primary text-center text-4xl font-bold tracking-tight md:text-5xl">
        One bookmark shelf.
      </h1>
      <p className="max-w-2xl text-center">
        Bookmark Harbor is a lightweight bookmark manager that shelves your
        links by tag and color, so the thing you saved six weeks ago is still
        easy to find today.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button size={'lg'} className="cursor-pointer" asChild>
          <Link to={'/register'}>Get started</Link>
        </Button>
        <Button
          size={'lg'}
          variant={'outline'}
          className="cursor-pointer"
          asChild
        >
          <Link to={'/login'}>I have an account</Link>
        </Button>
      </div>
    </section>
  );
}

export default HomePage;
