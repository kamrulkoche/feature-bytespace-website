import Logo from '@/shared/components/Logo/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-brand"
      data-testid="auth-layout"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />
      <header className="relative z-20">
        <div className="container-content flex h-[88px] items-center lg:h-[120px]">
          <Logo theme="light" />
        </div>
      </header>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
