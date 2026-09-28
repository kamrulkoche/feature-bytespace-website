import AuthVisual from '@/features/auth/components/AuthVisual';
import RegisterForm from '@/features/auth/components/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account | ByteSpace',
  description:
    'Sign up for ByteSpace quickly and for free. Create your account and start learning or publishing courses today.',
};

const RegisterPage = () => {
  return (
    <main
      className="container-content grid gap-10 pb-12 pt-2 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 lg:pb-16 lg:pt-0"
      data-testid="register-page"
    >
      <section className="order-2 lg:order-1">
        <AuthVisual
          title="Sign up and come in"
          description="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
        />
      </section>
      <section className="order-1 mx-auto w-full max-w-xl lg:order-2 lg:mx-0 lg:max-w-none">
        <RegisterForm />
      </section>
    </main>
  );
};

export default RegisterPage;
