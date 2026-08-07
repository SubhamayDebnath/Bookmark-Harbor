import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginInput } from '@/validators/auth.validator';

function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginInput) => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await login(values.email, values.password);
    navigate('/dashboard', { replace: true });
  };
  return (
    <>
      <Helmet>
        <title>Sign In — Bookmark Harbor</title>
        <meta
          name="description"
          content="Sign in to your Bookmark Harbor account."
        />
        <link rel="canonical" href="https://yourdomain.com/login" />
      </Helmet>
      <AuthForm>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              autoComplete="email"
              {...register('email')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forget-password"
                className="hover:text-primary text-sm font-medium"
              >
                Forget password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="******"
              autoComplete="new-password"
              {...register('password')}
            />
          </div>
          <div className="w-full">
            <Button disabled={loading} className="w-full">
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
        </form>
      </AuthForm>
    </>
  );
}

export default LoginPage;
