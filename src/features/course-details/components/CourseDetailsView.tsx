'use client';

import CourseDetailsContent, {
  CourseTab,
} from '@/features/course-details/components/CourseDetailsContent';
import CourseDetailsSidebar, {
  CourseMetaBadges,
  CourseShareButton,
} from '@/features/course-details/components/CourseDetailsSidebar';
import { CourseDetail } from '@/domain/course';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type CourseDetailsViewProps = {
  course: CourseDetail;
};

const CourseDetailsView = ({ course }: CourseDetailsViewProps) => {
  const [activeTab, setActiveTab] = useState<CourseTab>('About');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main data-testid="course-details-page" className="bg-white">
      <section className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-brand sm:h-[680px] lg:h-[720px]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-brand-grid bg-grid opacity-20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="container-content relative z-10 pb-16 pt-[88px] lg:pb-20 lg:pt-[120px]">
          <div className="flex flex-col gap-4 text-white sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl lg:max-w-[700px]">
              <h1 className="font-display text-[28px] font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[36px] lg:leading-[1.15]">
                {course.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#E5E6E8] sm:text-lg lg:text-[20px] lg:font-semibold lg:text-[#F5F5F6]">
                {course.subtitle}
              </p>
              <p className="mt-2 text-sm font-medium text-[#F1F4FE] sm:text-lg">
                {course.author}
              </p>
              <div className="mt-5">
                <CourseMetaBadges course={course} />
              </div>
            </div>

            <div className="shrink-0 self-start">
              <CourseShareButton title={course.title} />
            </div>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
            <div className="min-w-0">
              <div className="relative overflow-hidden rounded-[28px] bg-[#0B2BB8] shadow-float ring-1 ring-white/10">
                <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                  <Image
                    src={course.videoImage}
                    alt={`${course.title} preview`}
                    fill
                    priority
                    className={`object-cover object-center transition ${
                      isPlaying ? 'scale-105 brightness-90' : ''
                    }`}
                    sizes="(max-width:1024px) 100vw, 720px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10"
                    aria-hidden
                  />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={
                      isPlaying ? 'Pause course preview' : 'Play course preview'
                    }
                    aria-pressed={isPlaying}
                    onClick={() => setIsPlaying((value) => !value)}
                  >
                    {isPlaying ? (
                      <span className="rounded-full bg-black/55 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                        Preview playing — click to pause
                      </span>
                    ) : (
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand shadow-float transition hover:scale-105 sm:h-[78px] sm:w-[78px]">
                        <Play
                          size={30}
                          className="ml-1 fill-brand"
                          aria-hidden
                        />
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <CourseDetailsContent
                  course={course}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>
            </div>

            <aside className="relative z-20 w-full lg:sticky lg:top-28 lg:self-start">
              <CourseDetailsSidebar course={course} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailsView;
