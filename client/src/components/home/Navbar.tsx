import { Link } from 'react-router';
import ThemeButton from '@/components/common/ThemeButton';

function Navbar() {
  return (
    <header className="flex w-full items-center justify-center">
      <nav className="flex h-16 w-full max-w-4xl items-center justify-between px-5">
        <Link to={'/'} className="text-primary font-semibold tracking-tight">
          Bookmark Harbor
        </Link>
        <ThemeButton/>
      </nav>
    </header>
  );
}

export default Navbar;
