import CreatorCta from '@/features/home/components/CreatorCta';
import DiscoverCourses from '@/features/home/components/DiscoverCourses';
import FeaturedCategories from '@/features/home/components/FeaturedCategories';
import GrowthSection from '@/features/home/components/GrowthSection';
import HeroSection from '@/features/home/components/HeroSection';
import LearningPaths from '@/features/home/components/LearningPaths';
import PartnersSection from '@/features/home/components/PartnersSection';
import Testimonials from '@/features/home/components/Testimonials';

const HomePage = () => {
  return (
    <main data-testid="home-page">
      <HeroSection />
      <PartnersSection />
      <FeaturedCategories />
      <DiscoverCourses />
      <LearningPaths />
      <GrowthSection />
      <CreatorCta />
      <Testimonials />
    </main>
  );
};

export default HomePage;
