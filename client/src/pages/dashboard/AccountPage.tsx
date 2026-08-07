import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from '@/validators/auth.validator';

function AccountPage() {
  const { user, loading, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<ChangePasswordInput>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ChangePasswordInput) => {
    const result = changePasswordSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await changePassword(values.currentPassword, values.newPassword);
    reset();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="grid gap-5 py-5 md:grid-cols-2 md:gap-3">
      <div className="flex flex-col gap-3 border p-5">
        <h2 className="text-primary text-lg font-semibold tracking-tight">
          Account Details
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-muted-foreground text-xs">Name</p>
            <p className="text-sm font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Email</p>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Joined</p>
            <p className="text-sm font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Last Logged In</p>
            <p className="text-sm font-medium">
              {user?.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString()
                : '—'}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-3">
            {user?.role === 'admin' && (
              <Button variant={'outline'} asChild>
                <Link to={'/dashboard/admin'}>Admin Dashboard</Link>
              </Button>
            )}
            <Button
              variant={'destructive'}
              disabled={loading}
              onClick={handleLogout}
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                'Logout'
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border p-5">
        <h2 className="text-primary text-lg font-semibold tracking-tight">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter your current password"
              autoComplete="current-password"
              {...register('currentPassword')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              autoComplete="new-password"
              {...register('newPassword')}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
          </div>

          <div className="mt-2 w-full">
            <Button disabled={loading} className="w-full">
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountPage;
