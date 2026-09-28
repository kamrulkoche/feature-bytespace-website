import Header from '@/shared/components/Header/Header';
import Footer from '@/shared/components/Footer/Footer';

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-testid="main-page-layout">
      <Header />
      <div className="public-page-wrapper" data-testid="layout-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  );
}
