import Button from '@/shared/components/Button/Button';
import CategoryCard from '@/shared/components/CategoryCard/CategoryCard';
import { featuredCategories } from '@/data/categories/categories.data';

const FeaturedCategories = () => {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-content">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-lg font-medium text-highlight-purple">
              Featured Categories
            </p>
            <h2 className="font-display text-3xl font-medium text-black sm:text-4xl lg:text-[44px]">
              Innovative Paths to Knowledge
            </h2>
          </div>
          <Button href="/search" className="self-start sm:self-auto">
            View More
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
