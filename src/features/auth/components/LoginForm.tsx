'use client';

import Button from '@/shared/components/Button/Button';
import FormField from '@/shared/components/FormField/FormField';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1-.1 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.1-.8-2.1-3.7ZM14.4 6.2c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.7 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2-.6 2.7-1.4Z" />
  </svg>
);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex h-full w-full flex-col rounded-[24px] bg-white px-6 pb-10 pt-10 shadow-float sm:px-10 sm:pb-10 sm:pt-12 lg:min-h-[784px] lg:px-[63px] lg:pb-10 lg:pt-[61px]">
      <div className="flex flex-1 flex-col gap-10 lg:gap-[122px]">
        <div className="space-y-10">
          <div>
            <p className="text-lg font-normal text-brand">Sign In</p>
            <h1 className="mt-0 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[44px] lg:leading-[53px]">
              Welcome Back
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="designer@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <FormField
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <div className="flex justify-end">
              <Button type="submit" size="md" className="h-[46px] min-w-[104px] px-6">
                Login
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-[11px]">
            <span className="h-px flex-1 bg-[#D1D1D1]" aria-hidden />
            <span className="text-lg text-[#888888]">or</span>
            <span className="h-px flex-1 bg-[#D1D1D1]" aria-hidden />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Continue with Google"
              className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-3xl border border-[#D1D1D1] bg-white transition hover:bg-surface-soft"
            >
              <GoogleIcon />
            </button>
            <button
              type="button"
              aria-label="Continue with Apple"
              className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-3xl border border-[#D1D1D1] bg-white text-ink transition hover:bg-surface-soft"
            >
              <AppleIcon />
            </button>
          </div>
        </div>

        <p className="mt-auto flex flex-wrap items-center justify-center gap-1 text-center text-base text-[#888888]">
          <span>New user?</span>
          <Link href="/register" className="text-brand hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
