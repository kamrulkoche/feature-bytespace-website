import Footer from '@/shared/components/Footer/Footer';
import Header from '@/shared/components/Header/Header';
import NotFoundHero from '@/features/not-found/components/NotFoundHero';

const NotFoundPage = () => {
  return (
    <div data-testid="not-found-page">
      <Header />
      <NotFoundHero />
      <Footer />
    </div>
  );
};

export default NotFoundPage;
