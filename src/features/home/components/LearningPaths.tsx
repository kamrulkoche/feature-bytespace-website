import CategoryCard from '@/features/home/components/CategoryCard';
import { learningPaths } from '@/features/home/data';

const LearningPaths = () => {
  return (
    <section className="bg-surface-soft py-14 sm:py-20">
      <div className="container-content">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-strong sm:text-4xl lg:text-[36px]">
            Explore Diverse Learning Paths at Bytespace
          </h2>
          <p className="mt-4 text-base text-ink-faint sm:text-lg">
            At Bytespace, we believe in empowering individuals through
            knowledge. Our diverse range of courses spans various fields,
            ensuring there&apos;s something for everyone. Unleash your
            potential and explore our carefully curated categories.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {learningPaths.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              variant="path"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
