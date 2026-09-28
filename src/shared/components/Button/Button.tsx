import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  accent:
    'bg-accent text-ink hover:bg-accent-dark focus-visible:ring-accent',
  ghost: 'bg-transparent text-white hover:text-accent',
  outline:
    'border border-surface-line bg-white text-ink hover:border-ink-faint',
};

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-12 px-8 text-lg',
};

const Button = ({
  children,
  variant = 'accent',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
