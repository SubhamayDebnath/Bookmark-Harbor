import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/auth.store';
import { useAuth } from '@/hooks/useAuth';

function AccountButton() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();
  const { logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    return parts[0][0].toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="aspect-square cursor-pointer"
        >
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            getInitials(user?.name)
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background w-30 p-0">
        <DropdownMenuItem asChild>
          <Link to={'/dashboard/account'} className="px-2 py-2">
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="m-0" />
        <DropdownMenuItem className="p-0">
          <Button
            className="h-9 w-full justify-start px-3"
            variant={'ghost'}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountButton;
