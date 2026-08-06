import { Link } from 'react-router';
import ThemeButton from '@/components/common/ThemeButton';
import AccountButton from '@/components/common/AccountButton';

function Navbar() {
  return (
    <header className="flex w-full items-center justify-center">
      <nav className="flex h-16 w-full max-w-4xl items-center justify-between px-5">
        <Link to={'/'} className="text-primary font-semibold tracking-tight">
          Bookmark Harbor
        </Link>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <AccountButton />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
