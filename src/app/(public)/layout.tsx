import PublicPageLayout from '@/layouts/MainLayout/MainLayout';

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PublicPageLayout>{children}</PublicPageLayout>;
}
