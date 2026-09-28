import AuthVisual from '@/features/auth/components/AuthVisual';
import LoginForm from '@/features/auth/components/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | ByteSpace',
  description:
    'Sign in to ByteSpace with ease and get instant access to a world of knowledge.',
};

const LoginPage = () => {
  return (
    <main
      className="container-content grid gap-10 pb-12 pt-2 lg:grid-cols-[1fr_579px] lg:items-start lg:gap-16 lg:pb-16 lg:pt-0"
      data-testid="login-page"
    >
      <section className="order-2 lg:order-1 lg:pt-0">
        <AuthVisual
          title="Sign in with ease"
          description="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
        />
      </section>
      <section className="order-1 mx-auto w-full max-w-xl lg:order-2 lg:mx-0 lg:max-w-[579px]">
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
