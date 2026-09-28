import Image from 'next/image';
import { Check } from 'lucide-react';
import { growthFeatures } from '@/data/home/home.data';
import { studentAvatars } from '@/shared/constants/assets';

const GrowthSection = () => {
  return (
    <section id="creators" className="relative overflow-hidden bg-surface-soft py-16 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-32 right-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
        aria-hidden
      />

      <div className="container-content relative space-y-20 lg:space-y-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[44px] lg:leading-tight">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
              Explore our curated selection of courses tailored to enhance your
              capabilities and accelerate your career journey. Whether you&apos;re
              advancing in your current field or pivoting to something new,
              ByteSpace helps you grow with confidence.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: '12K', label: 'Students' },
                { value: '70+', label: 'Courses' },
                { value: '16', label: 'Creators' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-medium text-brand sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted sm:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-2 top-8 z-20 hidden w-[220px] overflow-hidden rounded-2xl bg-white shadow-float sm:block">
              <div className="relative h-28">
                <Image
                  src="/images/home/raw/growth-course.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 p-3">
                <p className="text-sm font-semibold text-black">
                  Learn Figma from Basic
                </p>
                <p className="text-xs text-ink-soft">by purepearl studio</p>
                <p className="text-sm font-semibold text-[#300B6A]">
                  $25 <span className="text-xs font-normal text-ink-soft">/lifetime</span>
                </p>
              </div>
            </div>

            <div className="absolute right-0 top-24 z-20 hidden w-44 rounded-2xl bg-white p-4 shadow-float sm:block">
              <p className="text-sm font-medium text-ink">Learning Progress</p>
              <p className="mt-1 font-display text-4xl font-semibold text-ink">
                55%
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full w-[55%] rounded-full bg-accent" />
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <Image
                src="/images/home/raw/hero.png"
                alt="Learner holding a laptop"
                fill
                className="object-contain object-bottom"
                sizes="(max-width:768px) 90vw, 420px"
              />
            </div>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 mx-auto w-full max-w-lg lg:order-1">
            <div className="absolute left-0 top-10 z-20 hidden w-44 rounded-2xl bg-brand p-4 text-white shadow-float sm:block">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-[10px] text-white/80">July 1-28</p>
                </div>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-ink">
                  +12$
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">$120.29</p>
            </div>

            <div className="absolute left-4 top-40 z-20 hidden w-44 rounded-2xl bg-brand p-4 text-white shadow-float sm:block">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">Year to Date</p>
                  <p className="text-[10px] text-white/80">2023</p>
                </div>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-ink">
                  +12$
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">$1,200.38</p>
            </div>

            <div className="absolute bottom-16 right-0 z-20 hidden rounded-2xl bg-white p-4 shadow-float sm:block">
              <p className="text-sm font-medium text-ink">Happy Students</p>
              <p className="mt-1 text-[10px] text-ink-faint">4.5 (240)</p>
              <div className="mt-3 flex items-center">
                {studentAvatars.map((avatar, index) => (
                  <Image
                    key={avatar}
                    src={avatar}
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

            <div className="relative mx-auto aspect-[435/596] w-full max-w-sm">
              <Image
                src="/images/home/raw/woman.png"
                alt="Creator managing courses on a tablet"
                fill
                className="object-contain object-bottom"
                sizes="(max-width:768px) 90vw, 380px"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl lg:text-[44px] lg:leading-tight">
              Create &amp; Manage Courses Easily.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
              ByteSpace supports individuals or entities in the creation,
              publication, and administration of educational courses.
            </p>
            <ul className="mt-8 space-y-4">
              {growthFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-lg font-medium text-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
