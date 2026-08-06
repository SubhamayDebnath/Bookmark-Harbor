import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function NotFound() {
  return (
    <section className="max-w-4xl w-full min-h-dvh h-full flex flex-col items-center justify-center gap-3 p-5">
        <h1 className="text-4xl font-bold text-primary tracking-tight">Error 404</h1>
      <p className="text-center">The page you're looking for doesn't exist, or may have been moved.</p>
      <Button variant={'outline'} size={'lg'} asChild>
        <Link to={'/'}>Back to home</Link>
      </Button>
    </section>
  );
}

export default NotFound