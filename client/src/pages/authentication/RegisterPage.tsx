import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import {
  registerSchema,
  type RegisterInput,
} from '@/validators/auth.validator';

function RegisterPage() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<RegisterInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: RegisterInput) => {
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    await registerUser(values.name, values.email, values.password);
    navigate('/dashboard', { replace: true });
  };
  return (
    <AuthForm>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            {...register('name')}
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="******"
            autoComplete="new-password"
            {...register('password')}
          />
        </div>
        <div className="w-full">
          <Button disabled={loading} className="w-full" size={'lg'}>
            {loading ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </div>
      </form>
    </AuthForm>
  );
}

export default RegisterPage;
