import Button from '@/shared/components/Button/Button';
import Image from 'next/image';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-brand pt-[88px] text-white lg:pt-[120px]">
      <div
        className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/90 blur-[2px] sm:h-[640px] sm:w-[640px] lg:h-[720px] lg:w-[720px]"
        aria-hidden
      />

      <Image
        src="/images/home/10-2614.png"
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute left-[4%] top-[18%] hidden w-24 animate-float lg:block"
      />
      <Image
        src="/images/home/10-2634.png"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute right-[8%] top-[22%] hidden w-20 animate-float-delayed lg:block"
      />
      <Image
        src="/images/home/10-2629.png"
        alt=""
        width={140}
        height={140}
        className="pointer-events-none absolute bottom-[18%] left-[6%] hidden w-28 animate-float-delayed lg:block"
      />
      <Image
        src="/images/home/10-2606.png"
        alt=""
        width={120}
        height={120}
        className="pointer-events-none absolute bottom-[22%] right-[5%] hidden w-24 animate-float lg:block"
      />

      <div className="container-content relative z-10 pb-8 pt-8 text-center lg:pb-0 lg:pt-10">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[72px] lg:leading-[1.05]">
          Get Access to Hundreds Courses Available
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-surface-line sm:text-lg">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>

        <form
          action="#"
          method="get"
          className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 rounded-full bg-white p-2 shadow-float sm:flex-row sm:items-center"
        >
          <label className="sr-only" htmlFor="hero-search">
            Search courses
          </label>
          <div className="flex flex-1 items-center gap-3 px-4 text-ink-faint">
            <Search size={18} />
            <input
              id="hero-search"
              name="q"
              type="search"
              placeholder="Course, topic, creator"
              className="h-11 w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Search
          </Button>
        </form>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex max-w-5xl flex-col items-center px-4 pb-0 sm:mt-12">
        <div className="relative w-full max-w-[620px]">
          <div className="absolute -left-2 top-8 z-20 hidden rounded-2xl bg-white p-4 shadow-float sm:block lg:-left-16">
            <p className="text-sm font-medium text-ink">UI/UX Design</p>
            <p className="mt-1 text-xs text-ink-faint">
              200 Courses • 1000+ Students
            </p>
          </div>

          <div className="absolute -right-2 top-6 z-20 hidden w-[210px] rounded-2xl bg-white p-4 shadow-float sm:block lg:-right-10">
            <p className="text-sm font-medium text-ink">Learning Progress</p>
            <p className="mt-1 font-display text-4xl font-semibold text-ink">
              55%
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full w-[55%] rounded-full bg-accent" />
            </div>
          </div>

          <div className="absolute bottom-16 left-0 z-20 hidden rounded-2xl bg-white p-4 shadow-float sm:block lg:-left-8">
            <p className="text-sm font-medium text-ink">Happy Students</p>
            <p className="mt-1 text-xs text-ink-faint">4.5 (240)</p>
            <div className="mt-3 flex items-center">
              {[
                '/images/home/10-2772.png',
                '/images/home/10-2773.png',
                '/images/home/10-2774.png',
                '/images/home/10-2775.png',
              ].map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className={`h-8 w-8 rounded-full border-2 border-white object-cover ${
                    index === 0 ? '' : '-ml-2'
                  }`}
                />
              ))}
              <span className="-ml-2 inline-flex h-8 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-ink">
                2K+
              </span>
            </div>
          </div>

          <div className="relative mx-auto aspect-[578/541] w-full max-w-[520px]">
            <Image
              src="/images/home/raw/hero.png"
              alt="Student learning with headphones and laptop"
              fill
              priority
              className="object-contain object-bottom mix-blend-screen"
              sizes="(max-width:768px) 90vw, 520px"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-20 -mb-px h-16 bg-surface-muted [clip-path:ellipse(70%_100%_at_50%_100%)] sm:h-24" />
    </section>
  );
};

export default HeroSection;
