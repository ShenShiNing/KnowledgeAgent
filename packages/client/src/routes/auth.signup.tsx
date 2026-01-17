import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { useAuthStore } from '@/store';
import { AuthLayout } from '@/layouts';
import { SignupForm } from '@/components/auth/SignupForm';
import { signup, type AuthResponse } from '@/api/auth';

// Public route loader - redirect to chat if already authenticated
const publicLoader = () => {
  const { token } = useAuthStore.getState();
  if (token) {
    throw redirect({ to: '/chat' });
  }
  return null;
};

export const Route = createFileRoute('/auth/signup')({
  beforeLoad: publicLoader,
  component: SignupPage,
});

function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await signup({ name, email, password });
    localStorage.setItem('auth_token', response.token);
    setAuth({ token: response.token, user: response.user });
    await router.navigate({ to: '/chat' });
    return response;
  };

  return (
    <AuthLayout title="Knowledge Agent">
      <SignupForm onSignup={handleSignup} />
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/auth/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
