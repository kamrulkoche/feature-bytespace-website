'use client';

import Logo from '@/shared/components/Logo/Logo';
import { getAuthUser, type AuthUser } from '@/shared/lib/auth';
import { navLinks } from '@/shared/constants/navigation';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeaderProps = {
  variant?: 'hero' | 'solid';
};

const Header = ({ variant = 'hero' }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const isHero = variant === 'hero';
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const sync = () => setUser(getAuthUser());
    sync();
    window.addEventListener('bytespace-auth-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('bytespace-auth-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return (
    <header
      className={`${
        isHero
          ? 'absolute inset-x-0 top-0 z-30 bg-transparent'
          : 'sticky top-0 z-30 bg-brand'
      }`}
      data-testid="site-header"
    >
      <div className="container-content flex h-[88px] items-center justify-between lg:h-[120px]">
        <Logo theme="light" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-surface-muted hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href={isLoggedIn ? '/dashboard' : '/login'}
            className="text-base text-surface-muted hover:text-white"
          >
            {isLoggedIn ? 'Dashboard' : 'Sign In'}
          </Link>
          {!isLoggedIn && (
            <Link
              href="/register"
              className="text-base text-surface-muted hover:text-white"
            >
              Join Us
            </Link>
          )}
          <div className="relative">
            <button
              type="button"
              className="rounded-full p-2 text-white hover:bg-white/10"
              aria-label="Shopping bag"
              aria-expanded={bagOpen}
              onClick={() => setBagOpen((value) => !value)}
            >
              <ShoppingBag size={20} />
            </button>
            {bagOpen && (
              <div className="absolute right-0 z-40 mt-2 w-64 rounded-2xl border border-surface-line bg-white p-4 text-ink shadow-float">
                <p className="text-sm font-medium">Your bag is empty</p>
                <p className="mt-1 text-xs text-ink-faint">
                  Browse courses and enroll to start learning.
                </p>
                <Link
                  href="/search"
                  className="mt-3 inline-flex text-sm font-medium text-brand hover:underline"
                  onClick={() => setBagOpen(false)}
                >
                  Browse courses
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isLoggedIn ? '/dashboard' : '/login'}
              className="rounded-lg px-3 py-2 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {isLoggedIn ? 'Dashboard' : 'Sign In'}
            </Link>
            {!isLoggedIn && (
              <Link
                href="/register"
                className="rounded-lg px-3 py-2 text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Join Us
              </Link>
            )}
            <Link
              href="/search"
              className="rounded-lg px-3 py-2 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Shopping bag
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
