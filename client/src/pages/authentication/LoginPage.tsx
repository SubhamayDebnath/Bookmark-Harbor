import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
function LoginPage() {
  return (
    <AuthForm>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@example.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="******"
            autoComplete="new-password"
          />
        </div>
        <div className="w-full">
          <Button className="w-full" size={'lg'}>
            Login
          </Button>
        </div>
      </form>
    </AuthForm>
  );
}

export default LoginPage;
