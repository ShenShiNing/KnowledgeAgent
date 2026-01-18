import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { useAuthStore } from '@/store';
import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/components/auth/LoginForm';
import { login, type AuthResponse } from '@/api/auth';

// Public route loader - redirect to chat if already authenticated
const publicLoader = () => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    throw redirect({ to: '/chat' });
  }
  return null;
};

export const Route = createFileRoute('/auth/login')({
  beforeLoad: publicLoader,
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await login({ email, password });
    setAuth({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
    await router.navigate({ to: '/chat' });
    return response;
  };

  return (
    <AuthLayout title="Knowledge Agent">
      <LoginForm onLogin={handleLogin} />
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link to="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
