import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordSchema } from '@/validators/auth.validator';

type ResetPasswordForm = {
  password: string;
};
function ResetPassword() {
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const { register, handleSubmit } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: ResetPasswordForm) => {
    if (!token) {
      toast.error('Invalid or expired reset link.');
      return;
    }
    const result = resetPasswordSchema.safeParse({
      token,
      password: values.password,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await resetPassword(token, values.password);
    navigate('/login', { replace: true });
  };
  return (
    <>
      <Helmet>
        <title>Set New Password — Bookmark Harbor</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="flex flex-1 justify-center py-5">
        <div className="bg-background relative flex h-fit w-full max-w-sm flex-col gap-5 rounded-lg border p-5">
          <h1 className="text-primary text-base font-semibold tracking-tight">
            Reset your password
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                {...register('password')}
              />
            </div>
            <div className="mt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>
          </form>
          <div className="text-center">
            <Link
              to="/login"
              className="hover:text-primary text-sm font-medium"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
