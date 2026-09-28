export const footerBrowseLinks = [
  { label: 'Featured Courses', href: '/search' },
  { label: 'Featured Categories', href: '/search' },
  { label: 'Business', href: '/search?category=Business' },
  { label: 'IT', href: '/search?category=IT' },
  { label: 'Design', href: '/search?category=Design' },
  { label: 'Development', href: '/search?category=Development' },
  { label: 'Marketing', href: '/search?category=Marketing' },
  { label: 'Photography', href: '/search?category=Photography' },
  { label: 'Finance', href: '/search?category=Finance' },
  { label: 'Sport', href: '/search?category=Sport' },
] as const;

export const footerPlatformLinks = [
  { label: 'Become a Creator', href: '/register' },
  { label: 'Affiliate Program', href: '/register' },
  { label: 'Contact', href: 'mailto:hello@bytespace.example' },
  { label: 'Help', href: '/search' },
  { label: 'About', href: '/' },
] as const;

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookies Settings', href: '/cookies' },
] as const;
