import Logo from '@/shared/components/Logo/Logo';
import Button from '@/shared/components/Button/Button';
import { footerBrowse, footerPlatform } from '@/features/home/data';
import Link from 'next/link';

const Footer = () => {
  const browseLeft = footerBrowse.slice(0, 5);
  const browseRight = footerBrowse.slice(5);

  return (
    <footer className="bg-white" data-testid="site-footer">
      <div className="container-content py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="max-w-md">
            <Logo theme="dark" />
            <p className="mt-5 text-sm leading-6 text-ink">
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>
            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
              action="#"
              method="post"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full flex-1 rounded-full border border-surface-line px-5 text-sm text-ink outline-none ring-brand focus:ring-2"
              />
              <Button type="submit" className="shrink-0">
                Search
              </Button>
            </form>
            <p className="mt-3 text-xs leading-5 text-ink">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-4 text-base font-medium text-ink-faint">Browse</p>
              <ul className="space-y-3">
                {browseLeft.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-ink hover:text-brand"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-base font-medium text-transparent select-none">
                Browse
              </p>
              <ul className="space-y-3">
                {browseRight.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-ink hover:text-brand"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-4 text-base font-medium text-ink-faint">
                Platform
              </p>
              <ul className="space-y-3">
                {footerPlatform.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-ink hover:text-brand"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-line">
        <div className="container-content flex flex-col gap-4 py-6 text-xs text-ink sm:flex-row sm:items-center sm:justify-between">
          <p>@ 2023 ByteSpace. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="#" className="hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-brand">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
