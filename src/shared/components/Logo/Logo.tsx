import Link from 'next/link';

type LogoProps = {
  className?: string;
  theme?: 'light' | 'dark';
};

const Logo = ({ className = '', theme = 'light' }: LogoProps) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-ink';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${textColor} ${className}`}
      aria-label="ByteSpace home"
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-ink"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 3.5h6.2c2.1 0 3.8 1.6 3.8 3.6 0 1.4-.8 2.6-2 3.2L14.5 14.5h-2.4l-2.2-3.7H6.2V14.5H4V3.5Zm2.2 2v3.6h3.8c.9 0 1.6-.7 1.6-1.6S11 5.5 10 5.5H6.2Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-logo text-2xl font-bold tracking-tight">
        ByteSpace
      </span>
    </Link>
  );
};

export default Logo;
