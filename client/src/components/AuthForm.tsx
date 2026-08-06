import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';

export default function AuthForm({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <section className="flex flex-1 justify-center py-5">
      <div className="bg-background relative flex h-fit w-full max-w-sm flex-col gap-5 border p-5">
        <div className="grid w-full grid-cols-2">
          <Button
            variant={pathname === '/register' ? 'default' : 'outline'}
            className="w-full"
            asChild
          >
            <Link to={'/register'}>Register</Link>
          </Button>
          <Button
            variant={pathname === '/login' ? 'default' : 'outline'}
            className="w-full"
            asChild
          >
            <Link to={'/login'}>Login</Link>
          </Button>
        </div>
        {children}
      </div>
    </section>
  );
}
