'use client';

import Button from '@/shared/components/Button/Button';
import FormField from '@/shared/components/FormField/FormField';
import { setAuthUser } from '@/shared/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const RegisterForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    if (trimmedName.length < 2) {
      setError('Enter your full name.');
      return;
    }
    if (!trimmedEmail.includes('@') || password.trim().length < 4) {
      setError('Enter a valid email and a password with at least 4 characters.');
      return;
    }
    setError('');
    setAuthUser({ email: trimmedEmail, name: trimmedName });
    router.push('/dashboard');
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[24px] bg-white px-6 py-10 shadow-float sm:px-10 sm:py-12 lg:min-h-[784px] lg:px-[63px] lg:pb-[51px] lg:pt-[61px]">
      <div className="space-y-10">
        <div>
          <p className="text-lg font-normal text-brand">Create an Account</p>
          <h1 className="mt-0 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[53px]">
            Welcome to ByteSpace
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <FormField
            id="fullName"
            label="Full Name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jamie Davis"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
              if (error) setError('');
            }}
            required
          />
          <FormField
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="designer@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError('');
            }}
            required
          />
          <FormField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="********"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError('');
            }}
            required
          />

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end pt-1">
            <Button type="submit" size="md">
              Continue
            </Button>
          </div>
        </form>
      </div>

      <p className="mt-10 text-center text-base text-ink-muted sm:mt-12">
        Already have an account?{' '}
        <Link href="/login" className="text-brand hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
