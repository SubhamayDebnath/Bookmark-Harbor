import { Link, Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useAuthStore } from '@/store/auth.store';

function HomePage() {
  const { user, loading } = useAuthStore();
  if (loading) {
    return <LoadingScreen />;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <Helmet>
        <title>Bookmark Harbor — Save and Organize Your Bookmarks</title>
        <meta
          name="description"
          content="Save, search, and organize your bookmarks in one place with Bookmark Harbor."
        />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>
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
    </>
  );
}

export default HomePage;
