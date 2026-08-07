import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema } from '@/validators/auth.validator';

type ForgotPasswordForm = {
  email: string;
};

function ForgotPassword() {
  const { forgotPassword, loading } = useAuth();

  const { register, handleSubmit } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordForm) => {
    const result = forgotPasswordSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await forgotPassword(values.email);
  };
  return (
    <section className="flex flex-1 justify-center py-5">
      <div className="bg-background relative flex h-fit w-full max-w-sm flex-col gap-5 border p-5">
        <h1 className="text-primary text-base font-semibold tracking-tight">
          Forgot your password
        </h1>
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
          <div className="mt-2">
            <Button className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="hover:text-primary text-sm font-medium">
            Back to Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
