import Image from 'next/image';
import { testimonials } from '@/features/home/data';

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-surface-soft py-16 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />

      <div className="container-content relative">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold text-black sm:text-4xl lg:text-[44px] lg:leading-tight">
            Discover What Our Community Is Saying
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear directly from those who have
            experienced the transformative journey of learning and creating on
            our platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-[28px] bg-white p-6 shadow-card sm:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold text-black">
                    {item.name}
                  </h3>
                  <p className="text-base text-brand">{item.role}</p>
                </div>
              </div>
              <p className="text-base leading-7 text-ink-soft">{item.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
