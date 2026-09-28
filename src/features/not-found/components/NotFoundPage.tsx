import Header from '@/shared/components/Header/Header';
import NotFoundHero from '@/features/not-found/components/NotFoundHero';

const NotFoundPage = () => {
  return (
    <div data-testid="not-found-page" className="min-h-screen bg-brand">
      <Header />
      <NotFoundHero />
    </div>
  );
};

export default NotFoundPage;
