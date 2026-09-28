'use client';

import Button from '@/shared/components/Button/Button';
import { clearAuthUser, getAuthUser, type AuthUser } from '@/shared/lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardView = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getAuthUser();
    setUser(current);
    setReady(true);
    if (!current) {
      router.replace('/login');
    }
  }, [router]);

  if (!ready || !user) {
    return (
      <main className="container-content py-24" data-testid="dashboard-page">
        <p className="text-ink-muted">Loading your dashboard…</p>
      </main>
    );
  }

  return (
    <main className="bg-white" data-testid="dashboard-page">
      <section className="container-content py-16 sm:py-20">
        <p className="text-lg font-medium text-brand">Dashboard</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Welcome back, {user.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-ink-muted sm:text-lg">
          You are signed in as {user.email}. Continue learning or explore new
          courses from the catalog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/search">Browse courses</Button>
          <Button
            variant="outline"
            onClick={() => {
              clearAuthUser();
              router.push('/');
            }}
          >
            Sign out
          </Button>
          <Link
            href="/"
            className="inline-flex h-11 items-center px-2 text-sm font-medium text-brand hover:underline"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DashboardView;
