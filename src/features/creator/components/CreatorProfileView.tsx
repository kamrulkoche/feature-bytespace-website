'use client';

import CourseCard from '@/shared/components/CourseCard/CourseCard';
import Button from '@/shared/components/Button/Button';
import type { CreatorProfile } from '@/domain/creator';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

type CreatorProfileViewProps = {
  creator: CreatorProfile;
};

const filterOptions = ['Filter', 'Level', 'Category', 'Most relevant'] as const;

const CreatorProfileView = ({ creator }: CreatorProfileViewProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('Most relevant');
  const courseList = useMemo(() => creator.courses, [creator.courses]);

  return (
    <main data-testid="creator-profile-page" className="bg-white">
      <section className="relative overflow-hidden bg-brand pt-[88px] text-white lg:pt-[120px]">
        <div
          className="pointer-events-none absolute inset-0 bg-brand-grid bg-grid opacity-25"
          aria-hidden
        />
        <div className="container-content relative z-10 pb-14 pt-6 lg:pb-16 lg:pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex shrink-0 items-start gap-5 sm:gap-8">
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={160}
                height={160}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-white/20 sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                priority
              />
              <div className="lg:hidden">
                <h1 className="font-display text-2xl font-semibold">{creator.name}</h1>
                <p className="mt-1 text-sm text-[#E5E6E8]">{creator.role}</p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="hidden lg:block">
                <h1 className="font-display text-3xl font-semibold lg:text-4xl">
                  {creator.name}
                </h1>
                <p className="mt-1 text-base text-[#E5E6E8]">{creator.role}</p>
              </div>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#F5F5F6] sm:text-lg">
                {creator.welcome}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#F5F5F6]/90 sm:text-lg">
                {creator.portfolioBlurb}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="rounded-2xl bg-white px-5 py-3">
                <p className="text-lg font-medium">
                  <span className="text-brand">{creator.productsCount}</span>{' '}
                  <span className="text-ink">Products</span>
                </p>
              </div>
              <div className="rounded-2xl bg-white px-5 py-3">
                <p className="text-lg font-medium">
                  <span className="text-brand">{creator.followersCount}</span>{' '}
                  <span className="text-ink">Followers</span>
                </p>
              </div>
            </div>
            <Button className="h-[46px] min-w-[120px] bg-white text-ink-strong hover:bg-surface-muted">
              Follow
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-content">
          <div className="mb-8 flex flex-wrap gap-3">
            {filterOptions.map((option) => {
              const isActive = option === activeFilter;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-surface-muted text-ink'
                      : 'bg-surface-muted/70 text-ink-muted hover:bg-surface-muted'
                  }`}
                >
                  {option}
                  <ChevronDown size={16} aria-hidden />
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courseList.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatorProfileView;
